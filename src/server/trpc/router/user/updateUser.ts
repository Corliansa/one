import { z } from "zod";
import { protectedProcedure } from "../../trpc";

export const updateUser = protectedProcedure
  .input(
    z.object({
      name: z.string().optional(),
      birthDate: z.date().optional(),
      occupation: z.string().optional(),
      location: z.string().optional(),
    })
  )
  .mutation(async ({ ctx, input: { name, birthDate, occupation, location } }) => {
    const userId = ctx.session.user.id;

    await ctx.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        birthDate,
        occupation,
        location,
      },
    });
  });

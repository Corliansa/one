import { z } from "zod";
import { protectedProcedure } from "../../trpc";

export const updateUserUniEmail = protectedProcedure
  .input(
    z.object({
      universityEmail: z.string(),
    }),
  )
  .mutation(async ({ ctx, input: { universityEmail } }) => {
    const userId = ctx.session.user.id;

    await ctx.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        universityEmail,
      },
    });
  });

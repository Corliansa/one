import { z } from "zod";
import { protectedProcedure } from "../../trpc";

export const updateUserUniEmailAndUni = protectedProcedure
  .input(
    z.object({
      universityName: z.string(),
      universityEmail: z.string(),
    }),
  )
  .mutation(async ({ ctx, input: { universityName, universityEmail } }) => {
    const userId = ctx.session.user.id;

    await ctx.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        universityName,
        universityEmail,
      },
    });
  });

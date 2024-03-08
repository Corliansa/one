import { protectedProcedure } from "../../trpc";

export const getUserUniEmail = protectedProcedure
  .query(async ({ ctx, }) => {
    const universityEmail = ctx.session.user.universityEmail;	
    return await ctx.prisma.user.findFirstOrThrow({
      where: {
        universityEmail: universityEmail,
      },
    });
  });

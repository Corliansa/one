import { protectedProcedure } from "../../trpc";

export const getUserUniEmailAndId = protectedProcedure
  .query(async ({ ctx, }) => {
    const userId = ctx.session.user.id;	
    const universityEmail = ctx.session.user.universityEmail;
    return await ctx.prisma.user.findFirstOrThrow({
      where: {
        id: userId,
        universityEmail: universityEmail,
      },
      
    });
  });

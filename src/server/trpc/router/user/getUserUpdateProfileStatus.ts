import { protectedProcedure } from "../../trpc";

export const getUserUpdateProfileStatus = protectedProcedure.query(
  async ({ ctx }) => {
    const userId = ctx.session.user.id;
    return await ctx.prisma.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
      select: {
        updated: true,
      },
    });
  },
);

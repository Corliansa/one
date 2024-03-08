import { protectedProcedure } from "../../trpc";

export const getVerificationTokenByUserId = protectedProcedure.query(
  async ({ ctx }) => {
    try {
      const currentUserId = ctx.session.user.id;
      const tokenRecord =
        await ctx.prisma.universityEmailVerificationToken.findFirst({
          where: {
            userId: currentUserId,
          },
        });

      return tokenRecord;
    } catch (error) {
      console.error("Error retrieving verification token:", error);
      return null;
    }
  },
);

import { protectedProcedure } from "../../trpc";

export const getVerificationTokenByUniEmail = protectedProcedure.query(
  async ({ ctx }) => {
    const universityEmail = ctx.session.user.universityEmail;
    if (!universityEmail) {
      console.error("No university email found in user session.");
      return null; // or throw an appropriate error
    }

    try {
      const currentDateTime = new Date();
      const tokenRecord =
        await ctx.prisma.universityEmailVerificationToken.findFirst({
          where: {
            email: universityEmail,
            expires: {
              gt: currentDateTime, // Only consider tokens that expire in the future
            },
          },
        });

      return tokenRecord; // Returns the token record or null if not found or expired
    } catch (error) {
      console.error("Error retrieving verification token by email:", error);
      return null;
    }
  },
);

import { z } from "zod";
import { protectedProcedure } from "../../trpc";
import bcrypt from "bcrypt";

export const verifyUniVerificationToken = protectedProcedure
  .input(
    z.object({
      token: z.string(),
      email: z.string().email(), // Using email as an identifier
    }),
  )
  .mutation(async ({ ctx, input: { token, email } }) => {
    try {
      // Find the token record associated with the provided email
      // each user has a maximum of one verification token at a time
      const tokenRecord =
        await ctx.prisma.universityEmailVerificationToken.findFirst({
          where: { email },
        });

      if (!tokenRecord) {
        return { error: "Verification record not found or already verified." };
      }

      const currentDateTime = new Date();
      if (new Date(tokenRecord.expires) < currentDateTime) {
        return { error: "Token has expired." };
      }

      const tokenMatches = await bcrypt.compare(token, tokenRecord.token);
      if (!tokenMatches) {
        return { error: "Token not match." };
      }

      // Perform user verification
      await ctx.prisma.user.update({
        where: { id: tokenRecord.userId! },
        data: {
          emailVerified: new Date(),
          verification: "VERIFIED",
        },
      });

      // Clean up the token record after successful verification
      await ctx.prisma.universityEmailVerificationToken.delete({
        where: { id: tokenRecord.id },
      });

      return { success: "Your email has been successfully verified." };
    } catch (error) {
      console.error("Verification error:", error);
      return { error: "Failed to verify email." };
    }
  });

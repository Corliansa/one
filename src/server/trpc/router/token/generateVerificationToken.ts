import { protectedProcedure } from "../../trpc";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

const saltRounds = 10; // The cost factor for generating the salt

export const generateVerificationToken = protectedProcedure
  .input(
    z.object({
      id: z.string(), // User ID to associate the token with
      email: z.string().email(), // User's email to send the token to
    }),
  )
  .mutation(async ({ ctx, input: { id, email } }) => {
    // Generate a new token and its hashed version
    const token = uuidv4();
    const hashedToken = await bcrypt.hash(token, saltRounds);
    const expires = new Date(new Date().getTime() + 15 * 60 * 1000); // Expiry date for the token

    try {
      if (ctx.session.user.verification === "VERIFIED") {
        return { success: false, message: "User is already verified." };
      }
      // Check if a token already exists for the given email or user ID
      const existingToken =
        await ctx.prisma.universityEmailVerificationToken.findFirst({
          where: { OR: [{ email: email }, { userId: id }] },
        });

      if (existingToken) {
        // If an existing token is found, update it with the new hashed token and expiry
        const expiry = existingToken.expires;

        await ctx.prisma.universityEmailVerificationToken.update({
          where: { id: existingToken.id },
          data: { token: hashedToken, expires: expires },
        });
        if (expiry && expiry > new Date()) {
          return {
            token,
            success: true,
            message: "Token updated and resended in email.",
          };
        }
      } else {
        // If no existing token is found, create a new record with the hashed token and expiry
        await ctx.prisma.universityEmailVerificationToken.create({
          data: {
            userId: id,
            email: email,
            token: hashedToken,
            expires: expires,
          },
        });
      }
      // Return the original plain token to the caller, NOT the hashed version
      return { token, success: true, message: "Token generated successfully." };
    } catch (error) {
      console.error("Failed to create or update verification token:", error);
      // In case of an error, you might want to handle it appropriately
      throw new Error("Failed to generate verification token");
    }
  });

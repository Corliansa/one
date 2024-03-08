import { z } from "zod";
import { protectedProcedure } from "../../trpc";
import { sendEmail } from "../../../../utils/nodemailer";

export const sendVerificationToken = protectedProcedure
  .input(
    z.object({
      email: z.string().email(),
      token: z.string(), // hashed token
    }),
  )
  .mutation(async ({ input: { email, token } }) => {
    try {
      // Construct the verification URL or message
      const verificationUrl = `https://sensus.ppijerman.org/auth/verify-token?token=${token}`; // Adjust as necessary

      // Send the verification email
      await sendEmail({
        to: email,
        subject: "Verifikasi Email Sensus PPI Jerman",
        text: `Verifikasi Email anda dengan mengklik link berikut: ${verificationUrl}`,
        html: `Verifikasi Email anda dengan mengklik link berikut: <a href="${verificationUrl}">Verifikasi</a>.`,
      });

      return { success: true, message: "Verification email sent successfully" };
    } catch (error) {
      console.error("Failed to send verification email:", error);
      return { success: false, message: "Failed to send verification email" };
    }
  });

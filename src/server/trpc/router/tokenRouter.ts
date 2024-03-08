import { router } from "../trpc";
import { generateVerificationToken } from "./token/generateVerificationToken";
import { getVerificationTokenByUserId } from "./token/getVerificationTokenByUserId";
import { getVerificationTokenByUniEmail } from "./token/getVerificationTokenByUniEmail";
import { sendVerificationToken } from "./token/sendVerificationToken";
import { verifyUniVerificationToken } from "./token/verifyUniVerificationToken";

export const tokenRouter = router({
  generateVerificationToken,
  getVerificationTokenByUserId,
  getVerificationTokenByUniEmail,
  sendVerificationToken,
  verifyUniVerificationToken,
});

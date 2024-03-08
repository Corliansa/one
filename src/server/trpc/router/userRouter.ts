import { updateUserById } from "./user/updateUserById";
import { getUserById } from "./user/getUserById";
import { updateUser } from "./user/updateUser";
import { router } from "../trpc";
import { getSession } from "./user/getSession";
import { getUser } from "./user/getUser";
import { getUsers } from "./user/getUsers";
import { updateUserByIdLogin } from "./user/updateUserByIdLogin";
import { getUserUpdateProfileStatus } from "./user/getUserUpdateProfileStatus";
import { updateUserUniEmail } from "./user/updateUserUniEmail";
import { getUserUniEmail } from "./user/getUserUniversityEmail";
import { getUserUniEmailAndId } from "./user/getUserUniversityEmailAndId";
import { updateUserUniEmailAndUni } from "./user/updateUserUniEmailAndUni";

export const userRouter = router({
  getSession,
  getUser,
  updateUser,
  getUsers,
  getUserById,
  updateUserById,
  updateUserByIdLogin,
  getUserUpdateProfileStatus,
  updateUserUniEmail,
  getUserUniEmail,
  getUserUniEmailAndId,
  updateUserUniEmailAndUni,
});

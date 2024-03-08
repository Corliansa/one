import { router } from "../trpc";
import { internalRouter } from "./internalRouter";
import { userRouter } from "./userRouter";
import { tokenRouter } from "./tokenRouter";

export const appRouter = router({
  user: userRouter,
  internal: internalRouter,
  token: tokenRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

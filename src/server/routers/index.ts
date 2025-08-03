import { authRouter } from "./auth";
import { userRouter } from "./user";
import { customerRouter } from "./customer";
import { router } from "../trpc";

export const appRouter = router({
    Auth: authRouter,
    User: userRouter,
    Customer: customerRouter
})

export type AppRouter = typeof appRouter;
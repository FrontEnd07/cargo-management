import { authRouter } from "./auth";
import { userRouter } from "./user";
import { customerRouter } from "./customer";
import { router } from "../trpc";
import { currencyRouter } from "./currency"

export const appRouter = router({
    Auth: authRouter,
    User: userRouter,
    Customer: customerRouter,
    Currency: currencyRouter
})

export type AppRouter = typeof appRouter;
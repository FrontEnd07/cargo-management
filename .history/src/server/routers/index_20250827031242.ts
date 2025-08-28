import { authRouter } from "./auth";
import { userRouter } from "./user";
import { customerRouter } from "./customer";
import { router } from "../trpc";
import { currencyRouter } from "./currency"
import { warehouseRouter } from "./warehouse"
import { productRoutesRouter } from "./product-routes"
import { itemsRouter } from "./items"

export const appRouter = router({
    Auth: authRouter,
    User: userRouter,
    Customer: customerRouter,
    Currency: currencyRouter,
    Warehouse: warehouseRouter,
    ProductRoutes: productRoutesRouter,
    items: itemsRouter,
})

export type AppRouter = typeof appRouter;
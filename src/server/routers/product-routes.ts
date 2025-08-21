import { protectedProcedure, router } from "server/trpc"
import { manualSchema } from '5_entities/manual'
import { TRPCError } from "@trpc/server"
import { z } from "zod"


export const productRoutesRouter = router({
    createProductRoutes: protectedProcedure
        .input(manualSchema)
        .mutation(async ({ input, ctx }) => {
            const { db } = ctx

            const productRoutesExist = await db.productRoutes.findMany({
                where: {
                    name: input.nameManual,
                    description: input.symbolManual
                }
            })

            if (productRoutesExist) {
                throw new TRPCError({
                    code: "CONFLICT",
                    message: "Уже есть названия с таким описанием."
                })
            }


            //Добавим направления
            try {
                await db.productRoutes.create({
                    data: {
                        name: input.nameManual,
                        description: input.symbolManual
                    }
                })

                return { message: "Направление успешно добавлено." }
            } catch {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Не удалось добавить данные"
                })
            }
        }),

    getProductRoutes: protectedProcedure
        .input(z.object({
            search: z.string().optional()
        }))
        .query(async ({ input, ctx }) => {
            const productRoutes = await ctx.db.productRoutes.findMany({
                orderBy: { createAt: "desc" },
                take: 5,
                where: input.search ? { name: { contains: input.search } } : undefined,
            });

            return productRoutes.map(({ id, name, description }) => ({ id, name, description }));
        })
})
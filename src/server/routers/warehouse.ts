import { protectedProcedure, router } from "server/trpc";
import { warehouseSchema } from "2_pages/warehouse";
import { TRPCError } from "@trpc/server";
import z from "zod";

export const warehouseRouter = router({
    AddWarehouse: protectedProcedure
        .input(warehouseSchema)
        .mutation(async ({ input, ctx }) => {
            const { db } = ctx

            const warehouseIsExist = await db.warehouse.findFirst({
                where: {
                    name: input.name,
                    phone: input.phone
                }
            })

            if (warehouseIsExist) {
                throw new TRPCError({
                    code: "CONFLICT",
                    message: "Склад с таким названием и телефоном уже существует!"
                })
            }

            try {
                await db.warehouse.create({
                    data: {
                        name: input.name,
                        phone: input.phone,
                        currencies: input.currencies,
                        address: input.address
                    }
                })

                return { message: "Склад успешно добавлен." }
            } catch {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Не удалось добавить данные"
                })
            }
        }),

    getWarehouse: protectedProcedure
        .input(z.object({
            search: z.string()
        })).query(async ({ ctx, input }) => {
            const data = await ctx.db.warehouse.findMany({
                where: input.search ? {
                    name: {
                        contains: input.search,
                    }
                } : undefined,
                take: 5,
                orderBy: { createdAt: "desc" }
            })

            return data.map(({ id, name }) => ({ id, name }));
        })
})
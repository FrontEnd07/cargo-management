import { protectedProcedure, router } from "server/trpc";
import { warehouseSchema } from "2_pages/warehouse";
import { TRPCError } from "@trpc/server";

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
        })
})
import { protectedProcedure, router } from "server/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { itemSchema, generalInfoSchema } from "4_features/item-calculator";

export const totalStatsSchema = z.object({
    totalVolume: z.string(),
    totalWeight: z.string(),
    avgRation: z.string()
})

export const itemsSchema = z.object({
    generalInfo: generalInfoSchema,
    items: z.array(itemSchema),
    totalStats: totalStatsSchema
})

export const itemsRouter = router({
    createItems: protectedProcedure
        .input(itemsSchema)
        .mutation(async ({ input, ctx }) => {
            const { db } = ctx
            try {
                // Используя упрощенную модель (второй вариант)
                const document = await db.document.create({
                    data: {
                        employeeId: input.generalInfo.employeeId,
                        warehouseId: input.generalInfo.warehouseId,
                        date: new Date(input.generalInfo.date),
                        customerId: input.generalInfo.customerId || null,
                        totalVolume: parseFloat(input.totalStats.totalVolume),
                        totalWeight: parseFloat(input.totalStats.totalWeight),
                        avgRatio: parseFloat(input.totalStats.avgRation),
                        items: {
                            create: input.items.map(item => ({
                                itemId: item.id,
                                name: item.name,
                                length: parseInt(item.length),
                                width: parseInt(item.width),
                                height: parseInt(item.height),
                                quantity: parseInt(item.quantity),
                                kgPerUnit: parseFloat(item.kgPerUnit),
                                totalVolume: parseFloat(item.totalVolume),
                                totalWeight: parseFloat(item.totalWeight),
                                ratio: parseFloat(item.ratio),
                                customerCode: item.customerCode,
                                customerName: item.customerName,
                                productRoutes: item.productRoutes,
                                shop: item.shop || null,
                                expense: item.expense ? parseFloat(item.expense) : null,
                                currency: item.currency || null,
                                note: item.note || null,
                            }))
                        }
                    },
                    include: {
                        items: true
                    }
                })

                return {
                    message: "Документ успешно создан.",
                    documentId: document.id
                };
            } catch (error) {
                console.error("Ошибка при создании документа:", error)
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Не удалось создать документ"
                })
            }
        })
})
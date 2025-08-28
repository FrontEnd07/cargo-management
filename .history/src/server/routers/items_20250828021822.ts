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
            console.log(input.items);
            try {
                const itemsList = await db.document.create({
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
                    message: "Товар успешно создан.",
                    itemsId: itemsList.id
                };
            } catch (error) {
                console.error("Ошибка при создании документа:", error)
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Не удалось создать документ"
                })
            }
        }),

    getItemsProduct: protectedProcedure
        .input(
            z.object({
                page: z.number().min(1).default(1),
                pageSize: z.number().min(1).max(100).default(10),
                sortBy: z.string()
                    .refine((val) => ['id', 'name', 'description', 'updateAt', 'createAt'].includes(val), {
                        message: "sortBy должно быть 'id', 'name' или 'description'",
                    })
                    .optional(),
                sortOrder: z.string()
                    .refine((val) => ['asc', 'desc'].includes(val), {
                        message: "sortOrder должно быть 'asc' или 'desc'",
                    })
                    .default('asc'),
            })
        )
        .query(async ({ input, ctx }) => {
            const { page, pageSize, sortBy, sortOrder } = input;
            const skip = (page - 1) * pageSize;

            type SortField = 'id' | 'name' | 'description' | 'updateAt' | 'createAt';
            type SortOrderType = 'asc' | 'desc';

            const validSortBy = sortBy as SortField | undefined;
            const validSortOrder = sortOrder as SortOrderType;

            let orderBy: any = { id: "asc" };
            if (validSortBy) {
                orderBy = { [validSortBy]: validSortOrder };
            }
            const [itemProduct, total] = await Promise.all([
                ctx.db.item.findMany({
                    orderBy,
                    skip,
                    take: pageSize,
                    include: {
                        document: true
                    }
                }),
                ctx.db.item.count(),
            ]);

            return {
                itemProduct,
                total,
                totalPages: Math.ceil(total / pageSize),
                currentPage: page,
            };
        })
})
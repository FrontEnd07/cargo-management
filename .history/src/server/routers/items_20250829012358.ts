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

const documentSortFields = ["warehouseId", "date"] as const;
type DocumentSortField = typeof documentSortFields[number];

export const itemsRouter = router({
    createItems: protectedProcedure
        .input(itemsSchema)
        .mutation(async ({ input, ctx }) => {
            const { db } = ctx

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
                                expense: item.expense ? parseFloat(item.expense) : 0,
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
                    .refine((val) => ['id', 'name', 'length', 'width', 'height', 'quantity', 'kgPerUnit', 'totalVolume', 'totalWeight', 'ratio', 'warehouseId', 'date', 'customerCode', 'customerName', 'expense'].includes(val), {
                        message: "sortBy должно быть одним из допустимых полей",
                    })
                    .optional(),
                sortOrder: z.string()
                    .refine((val) => ['asc', 'desc'].includes(val), {
                        message: "sortOrder должно быть 'asc' или 'desc'",
                    })
                    .default('asc'),
                warehouseId: z.string().optional(), // Добавляем фильтр по складу
                dateFrom: z.date().optional(), // Фильтр по дате
                dateTo: z.date().optional(), // Фильтр по дате
                customerId: z.string().optional(), // Фильтр по клиенту
                search: z.string().optional(), // Поиск
            })
        )
        .query(async ({ input, ctx }) => {
            const { page, pageSize, sortBy, sortOrder, warehouseId, dateFrom, dateTo, customerId, search } = input;
            const skip = (page - 1) * pageSize;

            type SortOrderType = 'asc' | 'desc';
            const validSortOrder = sortOrder as SortOrderType;

            let orderBy: any = { id: "asc" };

            if (sortBy) {
                // Поля из связанной модели Document
                const documentFields = ['warehouseId', 'date'];

                if (documentFields.includes(sortBy)) {
                    orderBy = {
                        document: {
                            [sortBy]: validSortOrder
                        }
                    };
                } else {
                    // Поля из основной модели Item
                    orderBy = { [sortBy]: validSortOrder };
                }
            }

            // Формируем условия фильтрации
            const whereConditions: any = {};

            // Фильтр по складу
            if (warehouseId) {
                whereConditions.document = {
                    warehouseId: warehouseId
                };
            }

            // Фильтр по дате
            if (dateFrom || dateTo) {
                whereConditions.document = {
                    ...whereConditions.document,
                    date: {}
                };
                if (dateFrom) {
                    whereConditions.document.date.gte = dateFrom;
                }
                if (dateTo) {
                    whereConditions.document.date.lte = dateTo;
                }
            }

            // Фильтр по клиенту
            if (customerId) {
                whereConditions.document = {
                    ...whereConditions.document,
                    customerId: customerId
                };
            }

            // Поиск по тексту
            if (search) {
                whereConditions.OR = [
                    { name: { contains: search, mode: 'insensitive' } },
                    { customerCode: { contains: search, mode: 'insensitive' } },
                    { customerName: { contains: search, mode: 'insensitive' } }
                ];
            }

            const [itemProduct, total] = await Promise.all([
                ctx.db.item.findMany({
                    where: whereConditions,
                    orderBy,
                    skip,
                    take: pageSize,
                    include: {
                        document: true
                    }
                }),
                ctx.db.item.count({
                    where: whereConditions
                }),
            ]);

            return {
                itemProduct,
                total,
                totalPages: Math.ceil(total / pageSize),
                currentPage: page,
            };
        })
})
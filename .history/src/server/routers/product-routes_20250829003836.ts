import { protectedProcedure, router } from "server/trpc"
import { manualSchema } from '5_entities/manual'
import { TRPCError } from "@trpc/server"
import { z } from "zod"

export const productRoutesRouter = router({
    createProductRoutes: protectedProcedure
        .input(manualSchema)
        .mutation(async ({ input, ctx }) => {
            const { db } = ctx

            const productRoutesExist = await db.productRoutes.findFirst({
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

    getProductRoutesAll: protectedProcedure
        .input(z.object({
            search: z.string().optional()
        }))
        .query(async ({ input, ctx }) => {
            const productRoutes = await ctx.db.productRoutes.findMany({
                where: input.search
                    ? {
                        name: {
                            contains: input.search,
                        },
                    }
                    : undefined,
                orderBy: { createAt: "desc" },
                take: 5,
            });

            return productRoutes.map(({ id, name, description }) => ({ id, name, description }));
        }),

    getProductRoutes: protectedProcedure
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

            const [productRoutes, total] = await Promise.all([
                ctx.db.productRoutes.findMany({
                    orderBy,
                    skip,
                    take: pageSize,
                }),
                ctx.db.productRoutes.count(),
            ]);

            return {
                productRoutes,
                total,
                totalPages: Math.ceil(total / pageSize),
                currentPage: page,
            };
        })
})
import { protectedProcedure, router, publicProcedure } from "server/trpc";
import { addCustomerSchema } from "2_pages/customer"
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const customerRouter = router({
    AddCustomer: protectedProcedure
        .input(addCustomerSchema)
        .mutation(async ({ input, ctx }) => {

            const { db } = ctx

            const customerIsExist = await db.customer.findFirst({
                where: {
                    phone: input.phone,
                    name: input.name
                }
            })

            if (customerIsExist) {
                throw new TRPCError({
                    code: "CONFLICT",
                    message: 'Клиент с таким именем и телефоном уже существует',
                });
            }

            // Создаем нового клиента с кодами
            try {
                await db.customer.create({
                    data: {
                        phone: input.phone,
                        name: input.name,
                        address: input.address,
                        date: input.date,
                        codes: {
                            create: input.codes.map((code: string) => ({
                                value: code
                            }))
                        }
                    },
                    include: {
                        codes: true
                    }
                })

                return { message: "Клиент успешно добавлен." };
            } catch {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Не удалось зарегистрировать данные",
                });
            }
        }),
    getCustomerCodes: publicProcedure
        .input(z.object({
            search: z.string().optional().default("")
        }))
        .query(async ({ ctx, input }) => {
            const customers = await ctx.db.customer.findMany({
                where: {
                    OR: [
                        {
                            name: {
                                contains: input.search,
                            },
                        },
                        {
                            codes: {
                                some: {
                                    value: {
                                        contains: input.search,
                                    },
                                },
                            },
                        },
                    ],
                },
                include: {
                    codes: {
                        select: {
                            id: true,
                            value: true,
                        },
                    },
                },
                orderBy: {
                    name: "asc",
                },
                take: 5,
            });

            // Создаем уникальный список кодов с информацией о клиенте
            const uniqueCodes = new Map();

            customers.forEach(customer => {
                customer.codes.forEach(code => {
                    if (!uniqueCodes.has(code.value)) {
                        uniqueCodes.set(code.value, {
                            id: code.id,
                            code: code.value,
                            customerId: customer.id,
                            customerPhone: customer.phone,
                            customerName: customer.name,
                        });
                    }
                });
            });

            return Array.from(uniqueCodes.values());
        }),
})
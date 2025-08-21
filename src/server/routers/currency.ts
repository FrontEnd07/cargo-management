import { protectedProcedure, router } from "server/trpc"
import { manualSchema } from "5_entities/manual";
import { TRPCError } from "@trpc/server";
import { z } from "zod"

export const currencyRouter = router({
    AddCurrency: protectedProcedure
        .input(manualSchema)
        .mutation(async ({ input, ctx }) => {
            const { db } = ctx
            
            const currencyIsExist = await db.currency.findFirst({
                where: {
                    name: input.nameManual,
                    symbol: input.symbolManual
                }
            })

            if (currencyIsExist) {
                throw new TRPCError({
                    code: "CONFLICT",
                    message: "Валюта с таким именем и символом уже существует"
                })
            }

            //Добавить новую валюту
            try {
                await db.currency.create({
                    data: {
                        name: input.nameManual,
                        symbol: input.symbolManual
                    }
                })

                return { message: "Валюта успешно добавлено." };
            } catch {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Не удалось добавить данные"
                })
            }
        }),
    getCurrency: protectedProcedure
        .input(z.object({
            search: z.string().optional()
        }))
        .query(async ({ ctx, input }) => {
            const currencies = await ctx.db.currency.findMany({
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

            return currencies.map(({ id, name, symbol }) => ({ id, name, symbol }));
        })
})
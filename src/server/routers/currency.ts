import { protectedProcedure, router } from "server/trpc"
import { addCurrencyTypeSchema, addCurrencySchema } from "2_pages/manual";
import { TRPCError } from "@trpc/server";

export const currencyRouter = router({
    AddCurrency: protectedProcedure
        .input(addCurrencySchema)
        .mutation(async ({ input, ctx }) => {
            const { db } = ctx

            const currencyIsExist = await db.currency.findFirst({
                where: {
                    name: input.nameCurrency,
                    symbol: input.symbolСurrency
                }
            })

            if (currencyIsExist) {
                throw new TRPCError({
                    code: "CONFLICT",
                    message: "Валюта с таким именем и символом уже существует"
                })
            }

            //Добавит новую валюту
            try {
                await db.currency.create({
                    data: {
                        name: input.nameCurrency,
                        symbol: input.symbolСurrency
                    }
                })

                return { message: "Валюта успешно добавлен." };
            } catch {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Не удалось добавить данные"
                })
            }
        })
})
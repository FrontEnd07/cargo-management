import { protectedProcedure, router } from "server/trpc";
import { addCustomerSchema } from "2_pages/customer"
import { TRPCError } from "@trpc/server";


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
})
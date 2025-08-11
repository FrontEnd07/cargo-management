"use client"

import { Input, Button } from "6_shared/ui"
import { Save } from "lucide-react"
import { addCurrencySchema, addCurrencyTypeSchema } from "2_pages/manual";
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "app/_trpcClient"
import { handleTRPCError } from "6_shared/lib";
import { toast } from "6_shared/utils";
import { useRouter } from "next/navigation";

export const AddCurrency = () => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        mode: "onSubmit",
        resolver: zodResolver(addCurrencySchema),
        defaultValues: {
            nameCurrency: "",
            symbolСurrency: "",
        }
    })
    const { mutate: createCurency, isPending: isPendingCreateCurrecy } = trpc.Currency.AddCurrency.useMutation({
        onSuccess: (data) => {
            toast.success(data.message)
            reset()
            router.refresh();
        },

        onError: (error) => {
            handleTRPCError(error);
        }
    })

    const handlerForm = (data: addCurrencyTypeSchema) => createCurency(data)

    return <div className="dark:bg-gray-800 bg-white shadow-lg sm:rounded-lg overflow-hidden">
        <div className="p-4 dark:bg-gray-700">
            <span>Валюты | Добавить валюту</span>
        </div>
        <div className="px-4">
            <div className="mb-4 mt-4">
                <Input
                    type="text"
                    label="Названия"
                    placeholder="Название*"
                    errors={errors.nameCurrency?.message}
                    id="nameCurrency"
                    {...register("nameCurrency")}
                />
            </div>
            <div className="mb-4">
                <Input
                    type="text"
                    label="Символ валюты"
                    placeholder="Символ валюты*"
                    errors={errors.symbolСurrency?.message}
                    id="symbolСurrency"
                    {...register("symbolСurrency")} />
            </div>
        </div>
        <div className="p-4">
            <Button
                onClick={handleSubmit(handlerForm)}
                isLoading={isPendingCreateCurrecy}
                className="w-full flex items-center align-center justify-center">

                <Save className="h-5 w-5 mr-1" />
                <span>Сохранить</span>

            </Button>
        </div>
    </div>
}
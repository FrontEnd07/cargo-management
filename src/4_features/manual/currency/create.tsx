"use client"

import { Input, ManualForm } from "6_shared/ui"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { manualSchema, ManualFormSchema } from "5_entities/manual"
import { trpc } from "app/_trpcClient"
import { handleTRPCError } from "6_shared/lib"
import { toast } from "6_shared/utils"
import { useRouter } from "next/navigation"
import NProgress from "nprogress"

export const AddCurrency = () => {
    const router = useRouter()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<ManualFormSchema>({
        mode: "onSubmit",
        resolver: zodResolver(manualSchema),
        defaultValues: {
            nameManual: "",
            symbolManual: "",
        }
    })

    const { mutate: createCurrency, isPending } = trpc.Currency.AddCurrency.useMutation({
        onSuccess: (data) => {
            toast.success(data.message)
            reset()
            NProgress.start()
            router.refresh()
        },
        onError: (error) => {
            handleTRPCError(error)
        }
    })

    const handleFormSubmit = (data: ManualFormSchema) => createCurrency(data)

    return (
        <ManualForm
            onSubmit={handleSubmit(handleFormSubmit)}
            isLoading={isPending}
        >
            <div className="mb-4 mt-4">
                <Input
                    type="text"
                    label="Название"
                    placeholder="Название*"
                    errors={errors.nameManual?.message}
                    id="nameManual"
                    {...register("nameManual")}
                />
            </div>
            <div className="mb-4">
                <Input
                    type="text"
                    label="Символ валюты"
                    placeholder="Символ валюты*"
                    errors={errors.symbolManual?.message}
                    id="symbolManual"
                    {...register("symbolManual")}
                />
            </div>
        </ManualForm>
    )
}
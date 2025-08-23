"use client"

import { Input, ManualForm } from "6_shared/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { manualSchema, ManualFormSchema } from "~/5_entities/manual";
import { trpc } from "app/_trpcClient";
import { handleTRPCError } from "6_shared/lib";
import { toast } from "6_shared/utils";

export const CreateProductRoutes = () => {
    const utils = trpc.useContext();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ManualFormSchema>({
        mode: "onChange",
        resolver: zodResolver(manualSchema),
        defaultValues: {
            nameManual: "",
            symbolManual: ""
        }
    })

    const { mutate: createProductRouter, isPending } = trpc.ProductRoutes.createProductRoutes.useMutation({
        onSuccess: (data) => {
            toast.success(data.message)
            reset()
            // NProgress.start()
            utils.ProductRoutes.getProductRoutes.invalidate();
        },
        onError: (error) => {
            handleTRPCError(error)
        }
    })

    const handleFormSubmit = (data: ManualFormSchema) => createProductRouter(data)
    return <ManualForm
        onSubmit={handleSubmit(handleFormSubmit)}
        isLoading={isPending}
    >
        <div className="mb-4 mt-4">
            <Input
                type="text"
                label="Напрваление*"
                placeholder="Напрваление*"
                errors={errors.nameManual?.message}
                id="nameManual"
                {...register("nameManual")}
            />
        </div>
        <div className="mb-4">
            <Input
                type="text"
                label="Короткое описание*"
                placeholder="Короткое описание*"
                errors={errors.symbolManual?.message}
                id="symbolManual"
                {...register("symbolManual")}
            />
        </div>
    </ManualForm>
}
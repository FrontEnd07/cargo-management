"use client";

import { DialogModal, SelectAsync } from "6_shared/ui"
import { Plus } from "lucide-react"
import { useForm, Controller } from 'react-hook-form'
import { Input, Button } from "6_shared/ui";
import { warehouseSchema, warehouseTypeSchema } from "2_pages/warehouse";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCurrencyLoader } from "2_pages/warehouse"
import { trpc } from "app/_trpcClient"
import { handleTRPCError } from "6_shared/lib";
import { toast } from "6_shared/utils";
import { useModalStore } from "6_shared/store";
import { useRouter } from "next/navigation";

export const Header = () => {
    const loadOptions = useCurrencyLoader()
    const { closeModal } = useModalStore()
    const router = useRouter()

    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: {
            errors
        }
    } = useForm({
        resolver: zodResolver(warehouseSchema),
        defaultValues: {
            name: "",
            phone: "",
            currencies: [],
            address: "",
        }
    });

    const mutation = trpc.Warehouse.AddWarehouse.useMutation({
        onSuccess: (data) => {
            toast.success(data.message);
            reset();
            closeModal()
            router.refresh();
        },

        onError: (error) => {
            handleTRPCError(error)
        }
    })

    const handlerSubmit = (data: warehouseTypeSchema) => mutation.mutate(data);
    const isPendingCreateWarehouse = mutation.isPending;
    
    return <div>
        <DialogModal title="Добавить склад" icon={Plus}>
            <div className="p-4 grid grid-cols-2 gap-5 max-w-md">
                <div>
                    <Input
                        label="Названия склада*"
                        placeholder="Названия склада*"
                        id="warehouseName"
                        errors={errors.name?.message}
                        {...register("name")}
                    />
                </div>
                <div>
                    <Input
                        label="Телефон"
                        id="warehousePhone"
                        placeholder="Телефон*"
                        errors={errors.phone?.message}
                        {...register("phone")}
                    />
                </div>
                <div className="col-span-full">
                    <Controller
                        name="currencies"
                        control={control}
                        render={({ field }) => (
                            <SelectAsync
                                label="Счет*"
                                id="currencies"
                                errors={errors.currencies?.message}
                                isMulti={true}
                                loadOptions={loadOptions}
                                value={field.value}
                                onChange={(option) => {
                                    field.onChange(option || []);
                                }}
                                placeholder="Выберите счет"
                            />
                        )}
                    />
                </div>
                <div className="col-span-full">
                    <Input
                        label="Адрес*"
                        id="address"
                        placeholder="Адрес*"
                        errors={errors.address?.message}
                        {...register('address')}
                    />

                </div>
            </div>
            <div className="border-t border-gray-950/5 dark:border-gray-700 p-4 py-3 text-right">
                <Button onClick={handleSubmit(handlerSubmit)} isLoading={isPendingCreateWarehouse}>
                    Добавить
                </Button>
            </div>
        </DialogModal>
    </div>
}
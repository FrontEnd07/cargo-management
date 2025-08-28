"use client"

import { Input, Mask, DateInput, Button, TagInput, CreateTags } from "6_shared/ui";
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addCustomerTypesSchema, addCustomerSchema } from "4_features/create-customer";
import { trpc } from 'app/_trpcClient';
import { toast } from '6_shared/utils';
import { handleTRPCError } from '6_shared/lib';
import { useModalStore } from '6_shared/store';
import { useRouter } from 'next/navigation';
import NProgress from "nprogress";

export const CreateCustomer = () => {
    const router = useRouter();
    const { closeModal } = useModalStore()

    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        mode: 'onSubmit',
        resolver: zodResolver(addCustomerSchema),
        defaultValues: {
            phone: "",
            name: "",
            address: "",
            codes: [],
            date: new Date(),
        }
    })

    const {
        mutate: customerCreate,
        isPending: isPendingCreateCustomer
    } = trpc.Customer.AddCustomer.useMutation({
        onSuccess: (data) => {
            toast.success(data.message)
            reset()
            closeModal()
            NProgress.start();
            router.refresh();
        },

        onError: (error) => {
            handleTRPCError(error)
        }
    })

    const handlerForm = (data: addCustomerTypesSchema) => customerCreate(data)

    return <div>
        <div className='p-4 grid grid-cols-2 gap-5 max-w-md'>
            <div>
                <Input
                    label="Имя*"
                    type="text"
                    id="name"
                    errors={errors.name?.message}
                    placeholder="Имя клиента*"
                    {...register('name')}
                />
            </div>
            <div>
                <Controller
                    control={control}
                    name="phone"
                    render={({ field, fieldState }) => (
                        <Mask
                            {...field}
                            mask={{
                                mask: '+{992} (00) 000-00-00',
                                lazy: false
                            }}
                            label="Телефон*"
                            errors={fieldState.error?.message}
                        />
                    )}
                />
            </div>
            <div>
                <DateInput
                    name='date'
                    label='Дата регистрации'
                    control={control}
                    className='text-left'
                    errors={errors.date?.message as string}
                />
            </div>
            <div>
                <Input
                    label="Адрес*"
                    type="text"
                    id="address"
                    errors={errors.address?.message}
                    placeholder="Адрес клиентов"
                    {...register("address")}
                />
            </div>
            <div className='col-span-full'>
                <CreateTags
                    errors={errors.codes?.message as string}
                    label="Коды клиента*"
                    id="code"
                />
            </div>
        </div>
        <div className='border-t border-gray-950/5 dark:border-gray-700 p-4 py-3 text-right'>
            <Button onClick={handleSubmit(handlerForm)} isLoading={isPendingCreateCustomer}>
                Добавить
            </Button>
        </div>
    </div>
}
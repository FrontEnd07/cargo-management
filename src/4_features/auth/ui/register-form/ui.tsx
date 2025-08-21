"use client";

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { registrSchema, authRegisterTypeSchema } from '4_features/auth';
import { Mask, Input, Button } from "6_shared/ui";
import { handleTRPCError } from "6_shared/lib";
import { Header, Footer } from "../index";
import { trpc } from 'app/_trpcClient';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import NProgress from "nprogress";

export const RegisterForm = () => {
    const router = useRouter();

    const form = useForm<authRegisterTypeSchema>({
        resolver: zodResolver(registrSchema)
    })

    const { control, handleSubmit, reset, register, formState: { errors } } = form;

    const {
        mutate: authCreateAccount,
        isPending: isPendingRegister
    } = trpc.Auth.Register.useMutation({
        onSuccess: (data) => {
            toast.success(data.message)
            reset();
            NProgress.start();
            router.push('/auth/login')
        },

        onError: (error) => {
            handleTRPCError(error)
        }
    })

    const handleSubmitLogin = (
        data: authRegisterTypeSchema
    ) => {
        authCreateAccount({
            name: data.name,
            phone: data.phone,
            password: data.password,
            confirmPassword: data.confirmPassword
        });
    }

    return <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
            <Header />
            {/* Registration Form */}
            <div className="py-8 px-6 shadow-lg rounded-lg bg-white dark:bg-slate-800 dark:border-gray-700 dark:border">
                <form onSubmit={handleSubmit(handleSubmitLogin)} className="space-y-6">
                    <Controller
                        control={control}
                        name="phone"
                        render={({ field, fieldState }) => (
                            <Mask
                                {...field}
                                mask={{
                                    mask: '+{992} (00) 000-00-00',
                                    lazy: false,
                                }}
                                label="Телефон"
                                errors={fieldState.error?.message}
                            />
                        )}
                    />

                    <Input
                        label='Имя'
                        id={'name'}
                        type="text"
                        {...register('name')}
                        placeholder="Имя"
                        errors={errors.name?.message}
                    />

                    <Input
                        label='Пароль'
                        id={'password'}
                        type="password"
                        {...register('password')}
                        placeholder="Пароль"
                        errors={errors.password?.message}
                    />

                    <Input
                        label='Пароль'
                        id={'confirmPassword'}
                        type="password"
                        {...register('confirmPassword')}
                        placeholder="Пароль"
                        errors={errors.confirmPassword?.message}
                    />
                    {/* Кнопка регистрации */}
                    <div>
                        <Button className='w-full flex justify-center' type='submit' isLoading={isPendingRegister}>
                            Войти
                        </Button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    </div >
}
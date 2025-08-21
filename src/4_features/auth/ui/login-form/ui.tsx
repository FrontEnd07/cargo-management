"use client";

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, authLoginTypeSchema } from '4_features/auth';
import { Mask, Input, Button } from "6_shared/ui";
import { Header, Footer } from "../index";
import { trpc } from 'app/_trpcClient';
import { toast } from 'react-toastify';
import { handleTRPCError } from '6_shared/lib';
import { useRouter } from 'next/navigation';
import NProgress from 'nprogress';

export const LoginForm = () => {
    const form = useForm<authLoginTypeSchema>({
        resolver: zodResolver(loginSchema)
    })

    const { control, handleSubmit, reset, register, formState: { errors } } = form;
    const router = useRouter();

    const {
        mutate: authLoginAccount,
        isPending: isPendingLogin
    } = trpc.Auth.Login.useMutation({
        onSuccess: (data) => {
            toast.success(data.message)
            reset()
            NProgress.start()
            router.push('/dashboard')
        },

        onError: (error) => {
            handleTRPCError(error)
        }
    })

    const handleSubmitLogin = (data: authLoginTypeSchema) => authLoginAccount({
        phone: data.phone,
        password: data.password
    })

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
                                {...field} // value, onChange, name
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
                        label='Пароль'
                        id={'password'}
                        type="password"
                        {...register('password')}
                        placeholder="Пароль"
                        errors={errors.password?.message}
                    />
                    {/* Кнопка регистрации */}
                    <div>
                        <Button className='w-full flex justify-center' type='submit' isLoading={isPendingLogin}>
                            Войти
                        </Button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    </div >
}
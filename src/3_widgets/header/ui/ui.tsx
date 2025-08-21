"use client";

import { Profile, Logo, Nav } from './index';
import type { DashboardHeaderProps } from "3_widgets/header";
import { useRouter } from 'next/navigation';
import { trpc } from 'app/_trpcClient';
import { toast } from 'react-toastify';
import { handleTRPCError } from '6_shared/lib';
import NProgress from 'nprogress';

export const Header = ({ payload }: DashboardHeaderProps) => {
    const router = useRouter()

    const { mutate: LogoutUser } = trpc.Auth.Logout.useMutation({
        onSuccess: () => {
            toast.success("Успешный выход из системы.")
            NProgress.start()
            router.push('/auth/login')
        },

        onError: (error) => {
            handleTRPCError(error);
        }
    })

    const HandleLogout = () => {
        if (!payload.sessionId) return;

        LogoutUser({ sessionId: payload.sessionId });
    }

    return <header className="dark:bg-slate-800 bg-white shadow-md border-b border-gray-200 dark:border-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
                <Logo />
                <Profile user={payload} onClickLogout={HandleLogout} />
            </div>
            <div className='py-3'>
                <Nav />
            </div>
        </div>
    </header>
}
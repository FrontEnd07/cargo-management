import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Image from "next/image";
import type { NavuserProfileProps } from '3_widgets/header'
import { trpc } from 'app/_trpcClient';
import { handleTRPCError } from '6_shared/lib';
import { LoaderCircle } from 'lucide-react';

export const Profile = ({ onClickLogout, user }: NavuserProfileProps) => {
    const userId = user.userId;

    const { data: dataUser, isPending, isError } = trpc.User.getUserById.useQuery({
        userId: userId,
    })

    if (isPending) return <LoaderCircle className='animate-spin' />

    if (isError) handleTRPCError(isError);

    return <DropdownMenu.Root>
        <DropdownMenu.Trigger className='cursor-pointer focus:outline-none flex items-center'>
            <div className='leading-3 text-right'>
                <h6>
                    <b>{dataUser?.name}</b>
                </h6>
                <p className='text-sm'>
                    {dataUser?.role}
                </p>
            </div>
            <Image
                width={28}
                height={28}
                alt="Профил"
                src="/profile.png"
                className='ml-2 rounded'
            />
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
            <DropdownMenu.Content
                className="dark:bg-slate-800 bg-white mt-1 py-2 dark:text-white rounded-xl shadow-xl dark:ring-white/10 ring ring-gray-950/5 min-w-[200px]"
                sideOffset={5}
            >
                <DropdownMenu.Item className="px-3 py-2 hover:bg-gray-950/5 focus:outline-none py-1 text-sm dark:hover:bg-slate-300/30 cursor-pointer">
                    Профиль
                </DropdownMenu.Item>
                <DropdownMenu.Item className="px-3 py-2 hover:bg-gray-950/5 focus:outline-none py-1 text-sm dark:hover:bg-slate-300/30 cursor-pointer">
                    Настройки
                </DropdownMenu.Item>
                <DropdownMenu.Separator className="h-px bg-gray-950/5 dark:bg-gray-700 my-1" />
                <DropdownMenu.Item onClick={onClickLogout} className="px-3 py-2 hover:bg-gray-950/5 focus:outline-none text-sm dark:hover:bg-slate-300/30 cursor-pointer">
                    Выйти
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Portal>
    </DropdownMenu.Root>
}
'use client'

import { paths } from '6_shared/routing'
import { LinkButton } from "6_shared/ui";
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

export const Nav = () => {
    const router = usePathname()

    return <div className='flex self-center lg:py-0 items-center'>
        {paths.sidebar.map((el, index) => {
            const isCurrentPage = router === el.url;

            return <LinkButton key={index} href={el.url} className={`${clsx(
                {
                    ['text-blue-400']: isCurrentPage,
                }
            )}`}>
                <div className='lg:mb-0 mr-10 flex items-center justify-center'>
                    {el.icon && <el.icon className='size-4.5 mr-1' />}
                    <span className='text-lg'>{el.title}</span>
                </div>
            </LinkButton>
        })}
    </div >
}
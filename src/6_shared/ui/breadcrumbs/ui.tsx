import clsx from 'clsx';
import Link from 'next/link';
import type { BreadcrumbsProps } from './type';

export const Breadcrumbs = ({ items, className }: BreadcrumbsProps) => {

    return <nav aria-label='breadcrumb' className={`${clsx(className)} w-max`}>
        <ol className="text-slate-600 shadow-md dark:text-slate-300 flex w-full flex-wrap items-center rounded-md dark:bg-gray-800 bg-slate-50 px-4 py-2">
            {items.map((item, el) => (
                <li key={el} className="flex items-center transition-colors text-sm">
                    {el != 0 && <span className="pointer-events-none mx-2">/</span>}
                    {item?.href ? (
                        <Link className="duration-200 hover:text-blue-500" href={item.href}>
                            {item?.text}
                        </Link>
                    ) : (
                        <>
                            {item.text}
                        </>
                    )}
                </li>
            ))}
        </ol>
    </nav>
}
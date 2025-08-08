'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { generateBreadcrumbs } from './lib';
import { Slash } from "lucide-react";

interface BreadcrumbsProps {
    className?: string;
}

export const Breadcrumbs = ({ className }: BreadcrumbsProps) => {
    const pathname = usePathname();
    const breadcrumbs = generateBreadcrumbs(pathname);

    if (breadcrumbs.length <= 1) return null;

    return (
        <nav className={clsx('w-max', className)} aria-label="Breadcrumb">
            <ol className="text-slate-600 shadow-md dark:text-slate-300 flex w-full flex-wrap items-center rounded-md dark:bg-gray-800 bg-slate-50 px-4 py-2">
                {breadcrumbs.map((crumb, index) => {
                    const isLast = index === breadcrumbs.length - 1;

                    return (
                        <li key={index} className="flex items-center transition-colors text-sm">
                            {index > 0 && <div className='ml-3 w-4'>/</div>}

                            {isLast ? (
                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    {crumb.title}
                                </span>
                            ) : (
                                <Link
                                    href={crumb.url || '#'}
                                    className="duration-200 hover:text-blue-500"
                                >
                                    {crumb.title}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

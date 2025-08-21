import React, { ReactNode } from "react";
import { TableHeader } from "./table-header";
import { TableBody } from "./table-body";
import { useTableFromUrl } from "./hooks/use-sorting-from-url";
import { LimitSelector } from "./limit-selector";
import { Pagination } from "./pagination";
import type { TableProps } from './types';

export const TableDynamic = ({ tableInstance, page, limit, total, totalPages, children }: TableProps) => {
    const headerGroups = tableInstance.getHeaderGroups();
    const rows = tableInstance.getRowModel().rows;
    const { handlePageChange, handleLimitChange } = useTableFromUrl();

    return (
        <div className="relative">
            {children}
            <table className='w-full shadow-md shadow-md text-sm text-left overflow-hidden sm:rounded-lg rtl:text-right text-gray-500 dark:text-gray-400'>
                <TableHeader headerGroups={headerGroups} />
                <TableBody columns={headerGroups[0]?.headers || []} rows={rows} />
            </table>
            <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4">
                <LimitSelector
                    currentLimit={limit}
                    onLimitChange={handleLimitChange}
                />
                <Pagination
                    currentPage={page}
                    total={total}
                    limit={limit}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </nav>
        </div>
    );
};
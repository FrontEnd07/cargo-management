"use client";

import { useReactTable, getCoreRowModel } from '@tanstack/react-table';
import { TableDynamic } from '6_shared/ui/table';
import { Filter } from "./filter";
import { useEffect } from "react";
import { useCustomerStore } from "6_shared/store"
import { LoaderCircle } from "lucide-react";

interface CustomerTableProps {
    columns: any[];
    data: any;
}

export const CustomerTable = ({ columns, data }: CustomerTableProps) => {
    const { isPending, clearState } = useCustomerStore();

    useEffect(() => {
        clearState();
    }, [data, clearState]);

    const table = useReactTable({
        data: data.tableData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualSorting: true,
        manualPagination: true,
    });

    return <div className='relative'>
        {isPending && (
            <div className="absolute inset-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm z-20 flex items-center justify-center">
                <div className="flex items-center space-x-3 bg-white px-4 py-2 rounded-lg shadow-lg dark:border">
                    <LoaderCircle className='animate-spin text-gray-700' />
                    <span className="text-sm font-medium text-gray-700">
                        Загрузка...
                    </span>
                </div>
            </div>
        )}

        <TableDynamic
            page={data.page}
            tableInstance={table}
            limit={data.limit}
            total={data.total}
            totalPages={data.totalPages}
        >
            <Filter />
        </TableDynamic>
    </div>;
};
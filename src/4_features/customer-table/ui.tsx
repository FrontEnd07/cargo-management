"use client";

import { useReactTable, getCoreRowModel } from '@tanstack/react-table';
import { Table } from '6_shared/ui/table';
import { Filter } from "./filter";

interface CustomerTableProps {
    columns: any[];
    data: any;
}

export const CustomerTable = ({ columns, data }: CustomerTableProps) => {

    const table = useReactTable({
        data: data.tableData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualSorting: true,
        manualPagination: true
    });

    return <Table
        page={data.page}
        tableInstance={table}
        limit={data.limit}
        total={data.total}
        totalPages={data.totalPages}
    >
        <Filter />
    </Table>;
};
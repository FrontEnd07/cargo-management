"use client";

import { useReactTable, getCoreRowModel } from '@tanstack/react-table';
import { Table } from '6_shared/ui/table';

interface CustomerTableProps {
    columns: any[];
    data: any[];
}

export const CustomerTable = ({ columns, data }: CustomerTableProps) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualSorting: true,
    });

    return <Table tableInstance={table} />;
};
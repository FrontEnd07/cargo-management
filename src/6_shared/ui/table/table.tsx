import React from "react";
import { TableHeader } from "./table-header";
import { TableBody } from "./table-body";

interface TableProps {
    tableInstance: any;
}

export const Table = ({ tableInstance }: TableProps) => {
    const headerGroups = tableInstance.getHeaderGroups();
    const rows = tableInstance.getRowModel().rows;

    return (
        <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
            <TableHeader headerGroups={headerGroups} />
            <TableBody
                columns={headerGroups[0]?.headers || []}
                rows={rows}
            />
        </table>
    );
};
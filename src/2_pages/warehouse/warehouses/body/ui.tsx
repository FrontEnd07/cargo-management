"use client";

import { TableDynamic } from "6_shared/ui";
import { warehouseColumns } from "2_pages/warehouse"
import { getCoreRowModel, useReactTable } from "@tanstack/react-table"

export const Body = ({ data }: { data: any }) => {

    const useTable = useReactTable({
        data: data.data,
        columns: warehouseColumns,
        manualSorting: true,
        manualPagination: true,
        getCoreRowModel: getCoreRowModel()
    })

    return <div>
        <TableDynamic
            tableInstance={useTable}
            page={data.pagination.page}
            limit={data.pagination.limit}
            total={data.pagination.total}
            totalPages={data.pagination.totalPages} />
    </div>
}
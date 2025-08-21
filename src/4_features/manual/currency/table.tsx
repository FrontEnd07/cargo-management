"use client"

import { currencyColumns } from "5_entities/manual"
import { getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { TableDynamic } from "6_shared/ui"

export const CurrencyTable = ({ dataCurrency }: { dataCurrency: any }) => {
    const table = useReactTable({
        data: dataCurrency.tableData,
        columns: currencyColumns,
        getCoreRowModel: getCoreRowModel(),
        manualSorting: true,
        manualPagination: true
    })

    return (
        <TableDynamic
            tableInstance={table}
            page={dataCurrency.page}
            limit={dataCurrency.limit}
            total={dataCurrency.total}
            totalPages={dataCurrency.totalPage}
        />
    )
}
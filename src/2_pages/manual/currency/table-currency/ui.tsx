"use client";

import { currencyColumns } from "2_pages/manual"
import { getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { Table } from "6_shared/ui"

export const TableCurrency = ({ dataCurrency }: { dataCurrency: any }) => {

    const table = useReactTable({
        data: dataCurrency.tableData,
        columns: currencyColumns,
        getCoreRowModel: getCoreRowModel(),
        manualSorting: true,
        manualPagination: true
    })

    return <Table
        tableInstance={table}
        page={dataCurrency.page}
        limit={dataCurrency.limit}
        total={dataCurrency.total}
        totalPages={dataCurrency.totalPage} />
}
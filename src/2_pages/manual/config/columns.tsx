import { ColumnDef } from "@tanstack/react-table"
import { Currency } from "@prisma/client"

export const currencyColumns: ColumnDef<Currency>[] = [
    {
        accessorKey: "id",
        header: "№",
        cell: ({ row }) => row.index + 1,
    },
    {
        accessorKey: "name",
        header: "Названия",
    },
    {
        accessorKey: "symbol",
        header: "Символ валюты",
    },
    {
        accessorKey: "handler",
        header: "Действии",
        enableSorting: false
    },
]
import type { Item } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table"

interface ItemsProductProps {
    page: number;
    pageSize: number;
}

export const getItemsProductColumns = ({ page, pageSize }: ItemsProductProps): ColumnDef<Item>[] => [
    {
        accessorKey: "id",
        header: "№",
        cell: ({ row }) => (page - 1) * pageSize + row.index + 1
    },
    {
        accessorKey: "id",
        header: "№",
        cell: ({ row }) => (page - 1) * pageSize + row.index + 1
    },
]
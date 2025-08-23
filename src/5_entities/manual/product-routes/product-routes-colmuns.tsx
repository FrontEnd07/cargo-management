import type { ProductRoutes } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"

interface ProductRoutesTableProps {
    page: number;
    pageSize: number;
}

export const createColumns = ({ page, pageSize }: ProductRoutesTableProps): ColumnDef<ProductRoutes>[] => [
    {
        accessorKey: "id",
        header: "№",
        cell: ({ row }) => (page - 1) * pageSize + row.index + 1
    },
    {
        accessorKey: "name",
        header: "Названия",
    },
    {
        accessorKey: "description",
        header: "Описание",
    },
    {
        accessorKey: "createAt",
        header: "Создан",
        cell: ({ row }) => new Date(row.getValue("createAt")).toLocaleDateString("ru-RU"),
        enableSorting: false
    },
    {
        id: "actions",
        header: "Действия",
        cell: ({ row }) => (
            <div>
                <button onClick={() => console.log("edit", row.original.id)}>✏️</button>
                <button onClick={() => console.log("delete", row.original.id)}>🗑</button>
            </div>
        ),
        enableSorting: true
    }
];
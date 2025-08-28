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
        accessorKey: "date",
        header: "Дата получения",
        cell: ({ row }) => {
            const dateStr = row.original.document?.date;
            if (!dateStr) return '-';

            // Преобразуем строку даты в форматированный вид
            const date = new Date(dateStr);
            return date.toLocaleDateString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
        }
    },
]
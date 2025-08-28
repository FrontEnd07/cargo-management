import type { Item, Prisma } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table"

interface ItemsProductProps {
    page: number;
    pageSize: number;
}

type ItemWithDocument = Prisma.ItemGetPayload<{
    include: { document: true }
}>;

export const getItemsProductColumns = ({ page, pageSize }: ItemsProductProps): ColumnDef<ItemWithDocument>[] => [
    {
        accessorKey: "id",
        header: "№",
        cell: ({ row }) => (page - 1) * pageSize + row.index + 1
    },
    {
        accessorKey: "date",
        header: "Дата получения",
        cell: ({ row }) => {
            const dateStr = row.original.document.date;
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
    {
        accessorKey: "name",
        header: "Наименование",
    },
    {
        accessorKey: "length",
        header: "Длина",
    },
    {
        accessorKey: "width",
        header: "Ширина",
    },
    {
        accessorKey: "height",
        header: "Высота",
    },
    {
        accessorKey: "quantity",
        header: "Кол. мест",
    },
    {
        accessorKey: "kgPerUnit",
        header: "Кг/шт."
    },
    {
        accessorKey: "totalVolume",
        header: "Объём (м3)"
    },
    {
        accessorKey: "totalWeight",
        header: "Общий вес (кг)"
    },
    {
        accessorKey: "ratio",
        header: "Соот-ния",
    },
    {
        accessorKey: "warehouseId",
        header: "Склад",
        cell: ({ row }) => {
            return row.original.document.warehouseId
        }
    },
    {
        accessorKey: "",
        header: "Расходы"
    },
    {
        accessorKey: "",
        header: "Клиент"
    },
    {
        accessorKey: "",
        header: "Действии"
    }
]
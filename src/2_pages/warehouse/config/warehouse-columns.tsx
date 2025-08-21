import { ColumnDef } from "@tanstack/react-table"
import { Warehouse } from "@prisma/client";

export const warehouseColumns: ColumnDef<Warehouse>[] = [
    {
        accessorKey: "id",
        header: "№",
        cell: ({ row }) => row.index + 1,
    },
    {
        accessorKey: "name",
        header: "Название",
    },
    {
        accessorKey: "phone",
        header: "Телефон",
    },
    {
        accessorKey: "address",
        header: "Адрес",
    },
    {
        accessorKey: "currencies",
        header: "Счета",
        cell: ({ row }) => {
            const currencies = row.getValue("currencies") as Array<{ label: string; value: string }> | null;

            if (!currencies || currencies.length === 0) {
                return <span className="text-gray-500">Нет счета</span>;
            }

            return (
                <div className="flex flex-wrap gap-1">
                    {currencies.map((currency, index) => (
                        <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        >
                            {currency.label}
                        </span>
                    ))}
                </div>
            );
        }
    }
]
import { ColumnDef } from "@tanstack/react-table";
import { Customer } from "@prisma/client"

export const customerColumns: ColumnDef<Customer>[] = [
    {
        accessorKey: "id",
        header: "№",
        cell: ({ row }) => row.index + 1,
    },
    {
        accessorKey: "name",
        header: "Имя",
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
        accessorKey: "codes",
        header: "Коды",
        cell: ({ getValue }) => {
            const codes = getValue() as string[];
            return (
                <div className="flex flex-wrap gap-1">
                    {codes.map((code, index) => (
                        <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                        >
                            {code}
                        </span>
                    ))}
                </div>
            );
        },
    },
    {
        accessorKey: "date",
        header: "Дата",
        cell: ({ getValue }) => {
            const date = getValue() as Date;
            return new Date(date).toLocaleDateString("ru-RU");
        },
    }
]
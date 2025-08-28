import { flexRender } from "@tanstack/react-table";
import { ChevronDown, ChevronUp } from 'lucide-react';
import { TableHeader, TableRow, TableHead } from "6_shared/ui";

export const renderTableHeader = (table: any) => (
    <TableHeader className="bg-gray-50">
        {table.getHeaderGroups().map((headerGroup: any) => (
            <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header: any) => (
                    <TableHead key={header.id}>
                        {header.isPlaceholder ? null : (
                            <div
                                className={
                                    header.column.getCanSort()
                                        ? 'cursor-pointer select-none flex items-center gap-1 hover:bg-gray-100 dark:hover:bg-gray-600 p-1 px-2 rounded'
                                        : 'flex items-center gap-1'
                                }
                                onClick={header.column.getToggleSortingHandler()}
                            >
                                {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                )}
                                {{
                                    asc: <ChevronUp className="w-4 h-4" />,
                                    desc: <ChevronDown className="w-4 h-4" />,
                                }[header.column.getIsSorted() as string] ?? null}
                            </div>
                        )}
                    </TableHead>
                ))}
            </TableRow>
        ))}
    </TableHeader>
);
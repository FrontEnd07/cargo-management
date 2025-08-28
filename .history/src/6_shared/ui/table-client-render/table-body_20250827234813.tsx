import { flexRender } from "@tanstack/react-table";
import { Loader2 } from 'lucide-react';
import { TableBody, TableRow, TableCell } from "6_shared/ui";

export const renderTableBody = (table: any, columns: any[], isLoading?: boolean, classNameCell?: string) => {
    if (isLoading) {
        return (
            <TableBody>
                <TableRow>
                    <TableCell
                        colSpan={columns.length}
                        className="text-center py-8"
                    >
                        <div className="flex flex-col items-center justify-center">
                            <Loader2 className="w-6 h-6 animate-spin text-blue-500 mb-2" />
                            <span className="text-gray-500">Загрузка данных...</span>
                        </div>
                    </TableCell>
                </TableRow>
            </TableBody>
        );
    }

    return (
        <TableBody>
            {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row: any) => (
                    <TableRow key={row.id}>
                        {row.getVisibleCells().map((cell: any) => (
                            <TableCell key={cell.id} className={`${classNameCell} px-6 py-4`}>
                                {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                )}
                            </TableCell>
                        ))}
                    </TableRow>
                ))
            ) : (
                <TableRow>
                    <TableCell
                        colSpan={columns.length}
                        className="text-center py-8 text-gray-500"
                    >
                        Нет данных для отображения
                    </TableCell>
                </TableRow>
            )}
        </TableBody>
    );
};
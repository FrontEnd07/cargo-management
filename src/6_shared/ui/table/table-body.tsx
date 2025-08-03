import {
    flexRender,
    Row,
    Header
} from "@tanstack/react-table";

interface TableBodyProps<TData> {
    rows: Row<TData>[];
    columns: Header<TData, unknown>[]; // Исправлено: используем Header вместо ColumnDef
}

export function TableBody<TData>({
    rows,
    columns,
}: TableBodyProps<TData>) {
    return (
        <tbody>
            {rows.length ? (
                rows.map((row) => (
                    <tr
                        className="bg-white [&:not(:last-child)]:border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                    >
                        {row.getVisibleCells().map((cell) => (
                            <td className="px-6 py-4" key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))
            ) : (
                <tr>
                    <td className="px-6 py-8 text-center text-gray-500" colSpan={columns.length}>
                        No results.
                    </td>
                </tr>
            )}
        </tbody>
    );
}
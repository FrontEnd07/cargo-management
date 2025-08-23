"use client";

import React from "react";
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    createColumnHelper,
    flexRender,
    type SortingState,
    type ColumnFiltersState,
} from "@tanstack/react-table";
import { trpc } from "app/_trpcClient";

type ProductRoutesTableType = {
    id: string; // Изменено: было number, в БД string - адаптируйте под вашу БД
    name: string;
    description: string;
    createAt: Date;  // ✅ Исправлено: было createdAt, в БД createAt
    updateAt: Date;  // ✅ Исправлено: было updatedAt, в БД updateAt
};


const columnHelper = createColumnHelper<ProductRoutesTableType>();

const columns = [
    columnHelper.accessor("id", {
        header: "ID",
        cell: (info) => info.getValue(),
        enableSorting: true,
    }),
    columnHelper.accessor("name", {
        header: "Имя",
        cell: (info) => info.getValue(),
        enableSorting: true,
    }),
    columnHelper.accessor("description", {
        header: "Описание",
        cell: (info) => info.getValue(),
        enableSorting: true,
    }),
    columnHelper.accessor("createAt", {
        header: "Создан",
        cell: (info) => new Date(info.getValue()).toLocaleDateString("ru-RU"),
        enableSorting: true,
    }),
    columnHelper.accessor("updateAt", { // ✅ Исправлено: было updatedAt
        header: "Обновлен",
        cell: (info) => new Date(info.getValue()).toLocaleDateString("ru-RU"),
        enableSorting: true,
    }),
    columnHelper.display({
        id: "actions",
        header: "Действия",
        cell: ({ row }) => (
            // <ActionButtons userId={row.original.id} />
            <div>действия</div>
        ),
    }),
];

export const ProductRoutesTable = () => {
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(10);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = React.useState("");

    const { data, isLoading, error } = trpc.ProductRoutes.getProductRoutes.useQuery({
        page,
        pageSize,
        sortBy: sorting[0]?.id,
        sortOrder: sorting[0]?.desc ? "desc" : "asc",
    });

    const table = useReactTable({
        data: data?.productRoutes ?? [],
        columns,
        state: {
            sorting,
            columnFilters,
            globalFilter,
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        manualPagination: true,
        pageCount: data?.totalPages ?? 0,
    });

    if (error) {
        return <div className="text-red-500">Ошибка загрузки данных: {error.message}</div>;
    }

    return (
        <div className="p-4">
            <div className="mb-4 flex justify-between items-center">
                <input
                    value={globalFilter ?? ""}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2"
                    placeholder="Поиск..."
                />
                {/* <CreateUserForm /> */}
            </div>

            {isLoading ? (
                <div>Загрузка...</div>
            ) : (
                <>
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-200">
                            <thead className="bg-gray-50">
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <tr key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <th
                                                key={header.id}
                                                className="px-4 py-2 text-left border-b"
                                            >
                                                {header.isPlaceholder ? null : (
                                                    <div
                                                        className={
                                                            header.column.getCanSort()
                                                                ? "cursor-pointer select-none flex items-center"
                                                                : ""
                                                        }
                                                        onClick={header.column.getToggleSortingHandler()}
                                                    >
                                                        {flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}
                                                        {{
                                                            asc: " 🔼",
                                                            desc: " 🔽",
                                                        }[header.column.getIsSorted() as string] ?? null}
                                                    </div>
                                                )}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody>
                                {table.getRowModel().rows.map((row) => (
                                    <tr key={row.id} className="hover:bg-gray-50">
                                        {row.getVisibleCells().map((cell) => (
                                            <td key={cell.id} className="px-4 py-2 border-b">
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Пагинация */}
                    <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2">
                            <span>Показать</span>
                            <select
                                value={pageSize}
                                onChange={(e) => {
                                    setPageSize(Number(e.target.value));
                                    setPage(1);
                                }}
                                className="border border-gray-300 rounded px-2 py-1"
                            >
                                {[5, 10, 20, 50].map((size) => (
                                    <option key={size} value={size}>
                                        {size}
                                    </option>
                                ))}
                            </select>
                            <span>записей</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setPage(1)}
                                disabled={page === 1}
                                className="px-3 py-1 border rounded disabled:opacity-50"
                            >
                                Первая
                            </button>
                            <button
                                onClick={() => setPage(page - 1)}
                                disabled={page === 1}
                                className="px-3 py-1 border rounded disabled:opacity-50"
                            >
                                Предыдущая
                            </button>
                            <span>
                                Страница {page} из {data?.totalPages ?? 0}
                            </span>
                            <button
                                onClick={() => setPage(page + 1)}
                                disabled={page === (data?.totalPages ?? 0)}
                                className="px-3 py-1 border rounded disabled:opacity-50"
                            >
                                Следующая
                            </button>
                            <button
                                onClick={() => setPage(data?.totalPages ?? 0)}
                                disabled={page === (data?.totalPages ?? 0)}
                                className="px-3 py-1 border rounded disabled:opacity-50"
                            >
                                Последняя
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
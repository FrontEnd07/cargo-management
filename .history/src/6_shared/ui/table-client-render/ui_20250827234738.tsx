"use client";

import { Dispatch, SetStateAction } from "react"
import {
    ColumnDef,
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    type SortingState,
    type ColumnFiltersState
} from "@tanstack/react-table";

import { Table } from "6_shared/ui"
import { renderTableHeader } from "./table-header";
import { renderTableBody } from "./table-body";
import { PaginationControls } from "./pagination-controls";

interface TableClientRenderProps<TData> {
    data: TData[];
    columns: ColumnDef<TData, any>[];
    sorting: SortingState;
    setSorting: Dispatch<SetStateAction<SortingState>>;
    columnFilters: ColumnFiltersState;
    setColumnFilters: Dispatch<SetStateAction<ColumnFiltersState>>;
    globalFilter: string;
    setGlobalFilter: Dispatch<SetStateAction<string>>;
    pageCount: number;
    isLoading?: boolean;
    classNameCell?: string;

    // Пагинация
    page: number;
    setPage: (page: number) => void;
    pageSize: number;
    setPageSize: (size: number) => void;
    totalRecords?: number;
}

export const TableClientRender = <TData,>({
    data,
    columns,
    sorting,
    setSorting,
    columnFilters,
    setColumnFilters,
    globalFilter,
    setGlobalFilter,
    pageCount,
    isLoading,
    // Пагинация
    page,
    setPage,
    pageSize,
    setPageSize,
    totalRecords
}: TableClientRenderProps<TData>) => {
    const table = useReactTable({
        data,
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
        pageCount: pageCount,
    });

    return (
        <div>
            <Table className="sm:rounded-lg overflow-hidden">
                {renderTableHeader(table)}
                {renderTableBody(table, columns, isLoading)}
            </Table>

            <PaginationControls
                page={page}
                setPage={setPage}
                pageSize={pageSize}
                setPageSize={setPageSize}
                totalPages={pageCount}
                totalRecords={totalRecords}
            />
        </div>



    )
}
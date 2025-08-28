"use client";

import { trpc } from "app/_trpcClient";
import { useState } from 'react';
import type { SortingState, ColumnFiltersState } from "@tanstack/react-table";
import { TableClientRender } from "6_shared/ui";
import { getItemsProductColumns } from "./columns"

export const ItemsProduct = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState("");

    const utils = trpc.useUtils();
    const { data, isLoading, error } = trpc.items.getItemsProduct.useQuery({
        page,
        pageSize,
        sortBy: sorting[0]?.id,
        sortOrder: sorting[0]?.desc ? "desc" : "asc"
    })

    const invalidateCache = () => {
        utils.items.getItemsProduct.invalidate();
    }
    console.log(data)
    const columns = getItemsProductColumns({ page, pageSize });

    return <div>
        <button onClick={invalidateCache}>Сбросить кэш</button>

        <TableClientRender
            data={data?.itemProduct ?? []}
            columns={columns}
            sorting={sorting}
            setSorting={setSorting}
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            pageCount={data?.totalPages ?? 0}
            isLoading={isLoading}
            page={page}
            setPage={setPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            classNameCell="!p-2"
            classNameHead="!p-3 flex items-center"
        />
    </div>
}
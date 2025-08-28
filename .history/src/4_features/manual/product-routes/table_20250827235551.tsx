"use client";

import { trpc } from "app/_trpcClient";
import { useState } from "react";
import type { SortingState, ColumnFiltersState } from "@tanstack/react-table"
import { TableClientRender } from "6_shared/ui";
import { createColumns } from "5_entities/manual";

export const ProductRoutesTable = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState("");

    const { data, isLoading, error } = trpc.ProductRoutes.getProductRoutes.useQuery({
        page,
        pageSize,
        sortBy: sorting[0]?.id,
        sortOrder: sorting[0]?.desc ? "desc" : "asc"
    })

    const columns = createColumns({ page, pageSize });

    return <TableClientRender
        data={data?.productRoutes ?? []}
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
        classNameCell="фывфыв"
    />
}
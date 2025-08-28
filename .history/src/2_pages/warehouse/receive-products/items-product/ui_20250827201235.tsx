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

    const { data, isLoading, error } = trpc.items.getItemsProduct.useQuery({
        page,
        pageSize,
        sortBy: sorting[0]?.id,
        sortOrder: sorting[0]?.desc ? "desc" : "asc"
    })

    const columns = getItemsProductColumns({ page, pageSize });

    return <div>
        ItemsProduct
    </div>
}
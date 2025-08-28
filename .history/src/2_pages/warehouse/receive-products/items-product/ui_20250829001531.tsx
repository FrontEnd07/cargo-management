"use client";

import { trpc } from "app/_trpcClient";
import { useState } from 'react';
import type { SortingState, ColumnFiltersState } from "@tanstack/react-table";
import { TableClientRender, SelectAsync } from "6_shared/ui";
import { useWarehouses, useCustomerCodeLoader } from "5_entities/receive-products";
import { getItemsProductColumns } from "./columns"

export const ItemsProduct = () => {
    const loadWarehouse = useWarehouses();
    const loadCustomerCode = useCustomerCodeLoader();

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

    const columns = getItemsProductColumns({ page, pageSize });

    return <div>
        <div className="grid grid-cols-4 gap-4 items-end mb-6">
            <div>
                <SelectAsync
                    label="Склад"
                    loadOptions={loadWarehouse} />
            </div>
            <div>
                <SelectAsync
                    label="Клиент"
                    loadOptions={loadCustomerCode} />
            </div>
        </div>

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
            classNameCell="!p-2 text-center"
            classNameHead="!p-2"
        />
    </div>
}
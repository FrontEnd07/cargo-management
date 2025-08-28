"use client";

import { trpc } from "app/_trpcClient";
import { useState } from 'react';
import type { SortingState, ColumnFiltersState } from "@tanstack/react-table";
import { TableClientRender, SelectAsync, DatePicker, Input } from "6_shared/ui";
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

    // Состояния для фильтров
    const [warehouseId, setWarehouseId] = useState<string | undefined>(undefined);
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
    const [customerId, setCustomerId] = useState<string | undefined>(undefined);
    const [search, setSearch] = useState<string>("");

    const query_params = {
        page,
        pageSize,
        sortBy: sorting[0]?.id,
        sortOrder: sorting[0]?.desc ? "desc" : "asc",
        warehouseId,
        dateFrom: dateRange[0] || undefined,
        dateTo: dateRange[1] || undefined,
        customerId,
        search: search || undefined
    };

    const { data, isLoading, error } = trpc.items.getItemsProduct.useQuery(query_params)

    const handleWarehouse = (element: any) => {
        setWarehouseId(element?.label || undefined);
        setPage(1); // Сбрасываем на первую страницу при изменении фильтра
    };

    const handleCustomer = (element: any) => {
        setCustomerId(element?.value || undefined);
        setPage(1);
    };

    const handleDate = (element: any) => {
        console.log('DatePicker element:', element); // Для отладки

        if (element && element.start && element.end) {
            // Диапазон дат
            const startDate = new Date(element.start);
            const endDate = new Date(element.end);
            setDateRange([startDate, endDate]);
        } else if (element.start) {
            // Одна дата - используем её как начало и конец диапазона
            const singleDate = new Date(element);
            setDateRange([singleDate]);
        } else if (Array.isArray(element) && element.length === 2) {
            // Массив из двух дат
            setDateRange([element[0], element[1]]);
        } else {
            // Нет даты или невалидные данные
            setDateRange([null, null]);
        }
        setPage(1);
    };

    const handleSearch = (element: any) => {
        setSearch(element.target.value);
        setPage(1);
    };

    const columns = getItemsProductColumns({ page, pageSize });

    return <div>
        <div className="grid grid-cols-4 gap-4 items-end mb-6">
            <div>
                <SelectAsync
                    label="Склад"
                    placeholder="Склад"
                    onChange={handleWarehouse}
                    loadOptions={loadWarehouse} />
            </div>
            <div>
                <DatePicker
                    label="Период"
                    placeholder="Выберите дату"
                    name="date"
                    range
                    onChange={handleDate} />
            </div>
            <div>
                <SelectAsync
                    label="Клиент"
                    onChange={handleCustomer}
                    loadOptions={loadCustomerCode} />
            </div>
            <div>
                <Input
                    onChange={handleSearch}
                    label="Поиск"
                    placeholder="Поиск"
                    value={search}
                />
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
import { ReactNode } from "react";

// Типы для сортировки
export interface TableSortState {
    sortBy: string;
    sortOrder: "asc" | "desc";
}

export interface TableSortHandler {
    (columnId: string): void;
}

export interface BaseTableProps {
    currentSort?: TableSortState;
    onSortChange?: TableSortHandler;
}

// Типы для пагинации
export interface PaginationState {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface PaginationHandler {
    (page: number): void;
}

export interface BasePaginationProps {
    pagination?: PaginationState;
    onPageChange?: PaginationHandler;
}

export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    showInfo?: boolean;
    total?: number;
    limit?: number;
}

//Таблица
export interface TableProps {
    tableInstance: any;
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    children?: ReactNode;
}

export interface GlobalTypeTable {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc"
}

export interface GlobalTypeTableProps {
    searchParams: Promise<{
        page?: string;
        limit?: string;
        search?: string;
        sortBy?: string;
        sortOrder?: "asc" | "desc"
    }>
}
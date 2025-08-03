
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
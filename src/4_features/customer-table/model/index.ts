import { create } from 'zustand';
import { SortingState } from '@tanstack/react-table';

interface TableSortingStore {
    sorting: SortingState;
    setSorting: (sorting: SortingState) => void;
    resetSorting: () => void;
}

export const useTableSorting = create<TableSortingStore>((set) => ({
    sorting: [],
    setSorting: (sorting) => set({ sorting }),
    resetSorting: () => set({ sorting: [] }),
}));
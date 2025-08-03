'use client';

import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useSortingFromUrl } from './hooks/use-sorting-from-url';

interface TableHeadRowProps {
    headerGroup: any;
}

export const TableHeadRow = ({ headerGroup }: TableHeadRowProps) => {
    const { id, headers } = headerGroup;

    // Используем хук прямо в компоненте
    const { currentSort, handleSortChange } = useSortingFromUrl();

    const getSortIcon = (columnId: string) => {
        if (!currentSort || currentSort.sortBy !== columnId) {
            return null;
        }

        return currentSort.sortOrder === 'asc'
            ? <ChevronUp className="w-4 h-4" />
            : <ChevronDown className="w-4 h-4" />;
    };

    const handleHeaderClick = (header: any) => {
        if (header.column.columnDef.enableSorting !== false) {
            handleSortChange(header.column.id);
        }
    };

    return (
        <tr key={id}>
            {headers.map((header: any) => {
                const canSort = header.column.columnDef.enableSorting !== false;

                return (
                    <th
                        className='px-6 py-3'
                        key={header.id}
                        colSpan={header.colSpan}
                    >
                        {header.isPlaceholder ? null : (
                            <div
                                className={
                                    canSort
                                        ? 'cursor-pointer select-none flex items-center gap-1 hover:bg-gray-100 dark:hover:bg-gray-600 p-1 rounded'
                                        : 'flex items-center gap-1'
                                }
                                onClick={() => canSort && handleHeaderClick(header)}
                            >
                                <span>{header.column.columnDef.header}</span>
                                {canSort && getSortIcon(header.column.id)}
                            </div>
                        )}
                    </th>
                );
            })}
        </tr>
    );
};
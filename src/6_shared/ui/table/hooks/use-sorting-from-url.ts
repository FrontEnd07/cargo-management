'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import type { TableSortState, TableSortHandler } from '../types';

export function useSortingFromUrl() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Получаем текущее состояние сортировки из URL (без дефолтов)
    const currentSort = useMemo<TableSortState | null>(() => {
        const sortBy = searchParams.get('sortBy');
        const sortOrder = searchParams.get('sortOrder') as 'asc' | 'desc';

        if (!sortBy) return null;

        return { sortBy, sortOrder: sortOrder || 'asc' };
    }, [searchParams]);

    // Обработчик изменения сортировки
    const handleSortChange = useCallback<TableSortHandler>((columnId: string) => {
        const params = new URLSearchParams(searchParams.toString());

        // Если кликнули по той же колонке - меняем направление
        if (currentSort && columnId === currentSort.sortBy) {
            const newOrder = currentSort.sortOrder === 'asc' ? 'desc' : 'asc';
            params.set('sortOrder', newOrder);
        } else {
            // Новая колонка - устанавливаем новую колонку и направление по умолчанию
            params.set('sortBy', columnId);
            params.set('sortOrder', 'asc');
        }

        // Сбрасываем страницу при смене сортировки
        params.delete('page');

        router.push(`?${params.toString()}`, { scroll: false });
    }, [currentSort, searchParams, router]);

    return {
        currentSort,
        handleSortChange,
    };
}
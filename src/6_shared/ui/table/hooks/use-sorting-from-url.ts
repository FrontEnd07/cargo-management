'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import type {
    TableSortState,
    TableSortHandler,
    PaginationHandler
} from '../types';
import { useCustomerStore } from "6_shared/store"

export function useTableFromUrl() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { setPending } = useCustomerStore();
    // Получаем текущее состояние сортировки из URL
    const currentSort = useMemo<TableSortState | null>(() => {
        const sortBy = searchParams.get('sortBy');
        const sortOrder = searchParams.get('sortOrder') as 'asc' | 'desc';

        if (!sortBy) return null;

        return { sortBy, sortOrder: sortOrder || 'asc' };
    }, [searchParams]);

    // Получаем текущее состояние пагинации из URL
    const currentPagination = useMemo<{ page: number; limit: number } | null>(() => {
        const page = searchParams.get('page');
        const limit = searchParams.get('limit');

        return {
            page: page ? parseInt(page) : 1,
            limit: limit ? parseInt(limit) : 10
        };
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
        params.set('page', '1');

        setPending(true);

        router.push(`?${params.toString()}`, { scroll: false });
    }, [currentSort, searchParams, router]);

    // Обработчик изменения страницы
    const handlePageChange = useCallback<PaginationHandler>((page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page.toString());
        setPending(true);
        router.push(`?${params.toString()}`, { scroll: false });
    }, [searchParams, router]);

    // Обработчик изменения лимита
    const handleLimitChange = useCallback((limit: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('limit', limit.toString());
        params.set('page', '1'); // Сбрасываем на первую страницу
        setPending(true);
        router.push(`?${params.toString()}`, { scroll: false });
    }, [searchParams, router]);

    return {
        currentSort,
        currentPagination,
        handleSortChange,
        handlePageChange,
        handleLimitChange,
    };
}
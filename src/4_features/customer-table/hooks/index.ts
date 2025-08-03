import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { SortingState, OnChangeFn  } from '@tanstack/react-table';
import { useTableSorting } from '../model';
import { deserializeSorting, serializeSorting } from '../lib';

export function useServerSorting() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { sorting, setSorting } = useTableSorting();

    // Инициализация из URL при загрузке
    useEffect(() => {
        const sortParam = searchParams.get('sort');
        if (sortParam) {
            const urlSorting = deserializeSorting(sortParam);
            setSorting(urlSorting);
        }
    }, [searchParams, setSorting]);

    // Обновление URL при изменении сортировки
    const updateSorting = useCallback<OnChangeFn<SortingState>>((updaterOrValue) => {
        // Получаем новое значение сортировки
        const newSorting = typeof updaterOrValue === 'function'
            ? updaterOrValue(sorting)
            : updaterOrValue;

        setSorting(newSorting);

        const params = new URLSearchParams(searchParams.toString());

        if (newSorting.length > 0) {
            params.set('sort', serializeSorting(newSorting));
        } else {
            params.delete('sort');
        }

        // Сброс страницы при смене сортировки
        params.delete('page');

        router.push(`?${params.toString()}`, { scroll: false });
    }, [sorting, setSorting, searchParams, router]);

    return {
        sorting,
        updateSorting
    };
}
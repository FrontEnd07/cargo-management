'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useDebounce } from 'use-debounce';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCustomerStore } from "6_shared/store";

export const useFilterParams = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { isPending, setPending } = useCustomerStore();

    // Ref для отслеживания первой загрузки
    const isInitialMount = useRef(true);
    const lastUpdateRef = useRef<string>('');

    // Инициализация значений из URL
    const [searchValue, setSearchValue] = useState(() => searchParams.get('search') || '');
    const [dateValue, setDateValue] = useState(() => searchParams.get('date') || '');

    const [debouncedSearch] = useDebounce(searchValue, 600);

    // Универсальная функция для обновления URL
    const updateURL = useCallback((params: Record<string, string | null>) => {
        const urlParams = new URLSearchParams(searchParams.toString());

        Object.entries(params).forEach(([key, value]) => {
            if (value && value.trim() !== '') {
                urlParams.set(key, value);
            } else {
                urlParams.delete(key);
            }
        });

        const newUrl = urlParams.toString()
            ? `${pathname}?${urlParams.toString()}`
            : pathname;

        const newUrlString = urlParams.toString();

        // Предотвращаем дублирующие обновления
        if (lastUpdateRef.current === newUrlString) {
            return;
        }

        lastUpdateRef.current = newUrlString;

        // Устанавливаем pending только если это не первая загрузка
        setPending(true);

        router.replace(newUrl, { scroll: false });
    }, [pathname, router, searchParams]);

    // Обновление URL при изменении search (debounced)
    useEffect(() => {
        updateURL({ search: debouncedSearch });
    }, [debouncedSearch, updateURL]);

    // Обновление URL при изменении date
    useEffect(() => {
        updateURL({ date: dateValue });
    }, [dateValue, updateURL]);

    // Функции для очистки с немедленным обновлением URL
    const handleClearSearch = useCallback(() => {
        setSearchValue('');
        // Немедленно обновляем URL, не ждем debounce
        updateURL({ search: null });
    }, [updateURL]);

    const handleClearDate = useCallback(() => {
        setDateValue('');
        updateURL({ date: null });
    }, [updateURL]);

    // Функция для очистки всех фильтров
    const handleClearAll = useCallback(() => {
        setSearchValue('');
        setDateValue('');
        updateURL({ search: null, date: null });
    }, [updateURL]);

    return {
        searchValue,
        dateValue,
        setSearchValue,
        setDateValue,
        handleClearSearch,
        handleClearDate,
        handleClearAll,
    };
};
import { useState, useCallback, useRef, useMemo } from "react";
import { Item, ValidationErrors } from "5_entities/receive-products";
import { createNewItem, calculateItemValues } from "./calculations";
import { validateItem } from "./validation";
import { useDebounce } from "use-debounce"; // или любая другая библиотека debounce

export const useItemsOptimized = () => {
    const idCounterRef = useRef(1);
    const [items, setItems] = useState<Item[]>(() => [createNewItem("item-1")]);
    const [validationErrors, setValidationErrors] = useState<Record<string, ValidationErrors>>({});

    // Кеш для вычислений, чтобы избежать пересчета
    const calculationCache = useRef<Map<string, Item>>(new Map());

    const createNewItemCallback = useCallback((): Item => {
        const newId = `item-${++idCounterRef.current}`;
        return createNewItem(newId);
    }, []);

    // Мемоизированная функция расчета с кешированием
    const calculateWithCache = useCallback((item: Item): Item => {
        const cacheKey = `${item.id}-${item.length}-${item.width}-${item.height}-${item.quantity}-${item.kgPerUnit}`;

        if (calculationCache.current.has(cacheKey)) {
            return calculationCache.current.get(cacheKey)!;
        }

        const calculated = calculateItemValues(item);
        calculationCache.current.set(cacheKey, calculated);

        // Ограничиваем размер кеша
        if (calculationCache.current.size > 100) {
            const firstKey = calculationCache.current.keys().next().value;
            calculationCache.current.delete(firstKey);
        }

        return calculated;
    }, []);

    // Debounced валидация для избежания частых вызовов
    const debouncedValidation = useMemo(
        () => useDebounce((itemId: string, item: Item) => {
            const errors = validateItem(item);
            setValidationErrors(prev => ({ ...prev, [itemId]: errors }));
        }, 300),
        []
    );

    // ✅ ОПТИМИЗИРОВАННАЯ функция изменения
    const handleItemChange = useCallback((index: number, field: keyof Item, value: string): void => {
        setItems(prevItems => {
            const currentItem = prevItems[index];
            if (currentItem[field] === value) return prevItems;

            // ✅ РЕШЕНИЕ: Изменяем только нужный элемент, сохраняя ссылки на остальные
            const updatedItem = { ...currentItem, [field]: value };
            const calculatedItem = calculateWithCache(updatedItem);

            // Создаем новый массив, но с сохранением ссылок на неизменившиеся элементы
            const newItems = prevItems.map((item, i) =>
                i === index ? calculatedItem : item
            );

            // ✅ Асинхронная валидация без блокировки рендера
            debouncedValidation(calculatedItem.id, calculatedItem);

            return newItems;
        });
    }, [calculateWithCache, debouncedValidation]);

    const handleAddItem = useCallback((): void => {
        setItems(prev => [...prev, createNewItemCallback()]);
    }, [createNewItemCallback]);

    const handleRemoveItem = useCallback((index: number): void => {
        setItems(prevItems => {
            if (prevItems.length === 1) return prevItems;

            const itemToRemove = prevItems[index];
            const newItems = prevItems.filter((_, i) => i !== index);

            // Очистка кеша для удаленного элемента
            const keysToDelete = Array.from(calculationCache.current.keys())
                .filter(key => key.startsWith(`${itemToRemove.id}-`));
            keysToDelete.forEach(key => calculationCache.current.delete(key));

            setValidationErrors(prev => {
                const { [itemToRemove.id]: _, ...rest } = prev;
                return rest;
            });

            return newItems;
        });
    }, []);

    const clearItems = useCallback(() => {
        setItems([createNewItem("item-1")]);
        idCounterRef.current = 1;
        setValidationErrors({});
        calculationCache.current.clear();
    }, []);

    const validateAllItems = useCallback((): boolean => {
        const allErrors: Record<string, ValidationErrors> = {};
        let isValid = true;

        for (const item of items) {
            const errors = validateItem(item);
            if (Object.keys(errors).length > 0) {
                allErrors[item.id] = errors;
                isValid = false;
            }
        }

        setValidationErrors(allErrors);
        return isValid;
    }, [items]);

    return {
        items,
        validationErrors,
        handleItemChange,
        handleAddItem,
        handleRemoveItem,
        clearItems,
        validateAllItems
    };
};
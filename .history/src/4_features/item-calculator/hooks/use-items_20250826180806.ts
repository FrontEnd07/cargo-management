// useItems.ts - Оптимизированная версия
import { useState, useCallback, useRef, useMemo } from "react";
import { Item, ValidationErrors } from "5_entities/receive-products";
import { createNewItem, calculateItemValues } from "./calculations";
import { validateItem } from "./validation";
import { useDebounce } from "6_shared/hooks";

// Поля, которые влияют на вычисления
const CALCULATION_FIELDS = ['length', 'width', 'height', 'quantity', 'kgPerUnit'] as const;

export const useItems = () => {
    const idCounterRef = useRef(1);
    const [items, setItems] = useState<Item[]>(() => [createNewItem("item-1")]);
    const [validationErrors, setValidationErrors] = useState<Record<string, ValidationErrors>>({});

    // Дебаунсим валидацию
    const debouncedItems = useDebounce(items, 300);

    const createNewItemCallback = useCallback((): Item => {
        const newId = `item-${++idCounterRef.current}`;
        return createNewItem(newId);
    }, []);

    // Мемоизированная функция проверки необходимости пересчета
    const needsRecalculation = useCallback((field: keyof Item): boolean => {
        return CALCULATION_FIELDS.includes(field as any);
    }, []);

    const handleItemChange = useCallback((index: number, field: keyof Item, value: string): void => {
        setItems(prevItems => {
            const currentItem = prevItems[index];
            if (currentItem[field] === value) return prevItems;

            const newItems = [...prevItems];
            const updatedItem = { ...currentItem, [field]: value };

            // Пересчитываем только если изменилось поле, влияющее на расчеты
            newItems[index] = needsRecalculation(field)
                ? calculateItemValues(updatedItem)
                : updatedItem;

            return newItems;
        });
    }, [needsRecalculation]);

    // Отдельный эффект для валидации с дебаунсом
    const validateItemsDebounced = useCallback(() => {
        const allErrors: Record<string, ValidationErrors> = {};

        for (const item of debouncedItems) {
            const errors = validateItem(item);
            if (Object.keys(errors).length > 0) {
                allErrors[item.id] = errors;
            }
        }

        setValidationErrors(allErrors);
    }, [debouncedItems]);

    // Запускаем валидацию при изменении debouncedItems
    useMemo(() => {
        validateItemsDebounced();
    }, [validateItemsDebounced]);

    const handleAddItem = useCallback((): void => {
        setItems(prev => [...prev, createNewItemCallback()]);
    }, [createNewItemCallback]);

    const handleRemoveItem = useCallback((index: number): void => {
        setItems(prevItems => {
            if (prevItems.length === 1) return prevItems;

            const itemToRemove = prevItems[index];
            const newItems = prevItems.filter((_, i) => i !== index);

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
// features/item-calculator/model/hooks/useItemCalculator.ts

import { useState, useCallback, useMemo, useEffect } from 'react';
import { Item, ValidationErrors } from '5_entities/receive-products';
import { calculateItemValues, calculateTotalStats, createNewItem } from './calculations';
import { validateItem } from './validation';
import { toast } from 'react-toastify';

export const useItemCalculator = () => {
    const [isClient, setIsClient] = useState(false);
    const [idCounter, setIdCounter] = useState(1);
    const [validationErrors, setValidationErrors] = useState<Record<string, ValidationErrors>>({});

    useEffect(() => {
        setIsClient(true);
    }, []);

    const defaultItem = useMemo((): Item => createNewItem('item-1'), []);
    const [items, setItems] = useState<Item[]>([defaultItem]);

    const handleCreateNewItem = useCallback((): Item => {
        const newId = `item-${idCounter + 1}`;
        setIdCounter(prev => prev + 1);
        return createNewItem(newId);
    }, [idCounter]);

    const validateAllItems = useCallback((): boolean => {
        const allErrors: Record<string, ValidationErrors> = {};
        let isValid = true;

        items.forEach(item => {
            const errors = validateItem(item);
            if (Object.keys(errors).length > 0) {
                allErrors[item.id] = errors;
                isValid = false;
            }
        });

        setValidationErrors(allErrors);
        return isValid;
    }, [items]);

    const handleItemChange = useCallback((index: number, field: keyof Item, value: string): void => {
        setItems((prevItems: Item[]) => {
            const newItems = [...prevItems];
            const updatedItem = { ...newItems[index], [field]: value };

            newItems[index] = calculateItemValues(updatedItem);

            const errors = validateItem(newItems[index]);
            setValidationErrors(prev => ({
                ...prev,
                [newItems[index].id]: errors
            }));

            return newItems;
        });
    }, []);

    const handleAddItem = useCallback((): void => {
        setItems((prevItems: Item[]) => [...prevItems, handleCreateNewItem()]);
    }, [handleCreateNewItem]);

    const handleRemoveItem = useCallback((index: number): void => {
        setItems((prevItems: Item[]) => {
            if (prevItems.length === 1) return prevItems;

            const newItems = prevItems.filter((_, i) => i !== index);
            setValidationErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[prevItems[index].id];
                return newErrors;
            });

            return newItems;
        });
    }, []);

    const handleClearAll = useCallback((): void => {
        setItems([defaultItem]);
        setIdCounter(1);
        setValidationErrors({});
    }, [defaultItem]);

    const handleSubmit = useCallback((): void => {
        const isValid = validateAllItems();

        if (!isValid) {
            toast.error('Пожалуйста, исправьте ошибки валидации перед отправкой')
            return;
        }

        console.log('Form data:', { items });
    }, [items, validateAllItems]);

    const totalStats = useMemo(() => calculateTotalStats(items), [items]);

    return {
        isClient,
        items,
        validationErrors,
        totalStats,
        handleItemChange,
        handleAddItem,
        handleRemoveItem,
        handleClearAll,
        handleSubmit
    };
};
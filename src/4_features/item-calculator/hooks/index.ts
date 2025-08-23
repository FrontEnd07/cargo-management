
import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { Item, ValidationErrors } from '5_entities/receive-products';
import { calculateItemValues, calculateTotalStats, createNewItem } from './calculations';
import { validateItem, validateGeneralInfo } from './validation';
import { toast } from 'react-toastify';

// Типы для общей информации
export interface GeneralInfo {
    employeeId: string;
    warehouseId: string;
    date: string;
    customerId?: string;
}

export interface GeneralInfoErrors {
    employeeId?: string;
    warehouseId?: string;
    date?: string;
    customerId?: string;
}

// Дебаунс хук для оптимизации валидации
const useDebounce = (value: any, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

export const useItemCalculator = () => {
    const [isClient, setIsClient] = useState(false);
    const idCounterRef = useRef(1); // Используем ref вместо state
    const [validationErrors, setValidationErrors] = useState<Record<string, ValidationErrors>>({});

    // Состояние для общей информации
    const [generalInfo, setGeneralInfo] = useState<GeneralInfo>(() => ({
        employeeId: '',
        warehouseId: '',
        date: new Date().toLocaleDateString('sv-SE'),
        customerId: ''
    }));

    const [generalInfoErrors, setGeneralInfoErrors] = useState<GeneralInfoErrors>({});

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Мемоизируем создание дефолтного item
    const defaultItem = useMemo((): Item => createNewItem('item-1'), []);
    const [items, setItems] = useState<Item[]>(() => [defaultItem]);

    // Оптимизированная функция создания нового item
    const createNewItemCallback = useCallback((): Item => {
        const newId = `item-${++idCounterRef.current}`;
        return createNewItem(newId);
    }, []);

    // Дебаунсим валидацию items для повышения производительности
    const debouncedItems = useDebounce(items, 300);

    // Функция обновления общей информации с батчингом
    const handleGeneralInfoChange = useCallback((field: keyof GeneralInfo, value: string): void => {
        setGeneralInfo(prev => {
            if (prev[field] === value) return prev; // Избегаем лишних обновлений
            return { ...prev, [field]: value };
        });

        // Очищаем ошибку асинхронно
        setGeneralInfoErrors(prev => {
            if (!prev[field]) return prev;
            const { [field]: _, ...rest } = prev;
            return rest;
        });
    }, []);

    // Оптимизированная валидация с мемоизацией
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

        setValidationErrors(prevErrors => {
            // Проверяем, изменились ли ошибки
            const errorsChanged = Object.keys(allErrors).length !== Object.keys(prevErrors).length ||
                Object.keys(allErrors).some(key =>
                    JSON.stringify(allErrors[key]) !== JSON.stringify(prevErrors[key])
                );

            return errorsChanged ? allErrors : prevErrors;
        });

        return isValid;
    }, [items]);

    // Валидация общей информации с мемоизацией
    const validateGeneralInfoData = useCallback((): boolean => {
        const errors = validateGeneralInfo(generalInfo);

        setGeneralInfoErrors(prevErrors => {
            const errorsChanged = JSON.stringify(errors) !== JSON.stringify(prevErrors);
            return errorsChanged ? errors : prevErrors;
        });

        return Object.keys(errors).length === 0;
    }, [generalInfo]);

    // Оптимизированное изменение item с батчингом
    const handleItemChange = useCallback((index: number, field: keyof Item, value: string): void => {
        setItems(prevItems => {
            const currentItem = prevItems[index];

            // Избегаем лишних обновлений
            if (currentItem[field] === value) return prevItems;

            const newItems = [...prevItems];
            const updatedItem = { ...currentItem, [field]: value };
            newItems[index] = calculateItemValues(updatedItem);

            // Валидируем только измененный item
            const errors = validateItem(newItems[index]);
            setValidationErrors(prev => ({
                ...prev,
                [newItems[index].id]: errors
            }));

            return newItems;
        });
    }, []);

    const handleAddItem = useCallback((): void => {
        setItems(prevItems => [...prevItems, createNewItemCallback()]);
    }, [createNewItemCallback]);

    const handleRemoveItem = useCallback((index: number): void => {
        setItems(prevItems => {
            if (prevItems.length === 1) return prevItems;

            const itemToRemove = prevItems[index];
            const newItems = prevItems.filter((_, i) => i !== index);

            // Удаляем ошибки для удаленного item
            setValidationErrors(prev => {
                const { [itemToRemove.id]: _, ...rest } = prev;
                return rest;
            });

            return newItems;
        });
    }, []);

    const handleClearAll = useCallback((): void => {
        setItems([defaultItem]);
        idCounterRef.current = 1;
        setValidationErrors({});

        setGeneralInfo({
            employeeId: '',
            warehouseId: '',
            date: new Date().toISOString().split('T')[0],
            customerId: ''
        });
        setGeneralInfoErrors({});
    }, [defaultItem]);

    const handleSubmit = useCallback((): void => {
        const isGeneralInfoValid = validateGeneralInfoData();
        const areItemsValid = validateAllItems();

        if (!isGeneralInfoValid || !areItemsValid) {
            toast.error('Пожалуйста, исправьте ошибки валидации перед отправкой');
            return;
        }

        const submitData = {
            generalInfo,
            items,
            totalStats: calculateTotalStats(items)
        };

        console.log('Form data:', submitData);
        toast.success('Данные успешно отправлены');
    }, [generalInfo, items, validateGeneralInfoData, validateAllItems]);

    // Мемоизируем вычисление статистики только при изменении debouncedItems
    const totalStats = useMemo(() => calculateTotalStats(debouncedItems), [debouncedItems]);

    return {
        isClient,
        items,
        validationErrors,
        totalStats,
        generalInfo,
        generalInfoErrors,
        handleItemChange,
        handleAddItem,
        handleRemoveItem,
        handleClearAll,
        handleSubmit,
        handleGeneralInfoChange
    };
};
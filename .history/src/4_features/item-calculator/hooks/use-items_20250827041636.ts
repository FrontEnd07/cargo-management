"use client";

import { useState, useCallback, useRef } from "react";
import { Item, ValidationErrors } from "5_entities/receive-products";
import { createNewItem, calculateItemValues } from "./calculations";
import { validateItem } from "./validation";

export const useItems = () => {
    const idCounterRef = useRef(1);
    const [items, setItems] = useState<Item[]>(() => [createNewItem("item-1")]);
    const [validationErrors, setValidationErrors] = useState<Record<string, ValidationErrors>>({});

    const createNewItemCallback = useCallback((): Item => {
        const newId = `item-${++idCounterRef.current}`;
        return createNewItem(newId);
    }, []);

    const handleItemChange = useCallback((index: number, field: keyof Item, value: string): void => {
        setItems(prevItems => {
            const currentItem = prevItems[index];
            if (currentItem[field] === value) return prevItems;

            const newItems = [...prevItems];
            const updatedItem = { ...currentItem, [field]: value };
            newItems[index] = calculateItemValues(updatedItem);

            const errors = validateItem(newItems[index]);
            setValidationErrors(prev => ({ ...prev, [newItems[index].id]: errors }));

            return newItems;
        });
    }, []);

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

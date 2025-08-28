"use client";

import { useCallback, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useItems } from "./use-items";
import { useGeneralInfo } from "./use-general-info";
import { useTotalStats } from "./use-total-stats";

export const useItemCalculator = () => {
    const [isClient, setIsClient] = useState(false);

    const {
        items, validationErrors,
        handleItemChange, handleAddItem, handleRemoveItem,
        clearItems, validateAllItems
    } = useItems();

    const {
        generalInfo, generalInfoErrors,
        handleGeneralInfoChange, clearGeneralInfo, validateGeneralInfoData
    } = useGeneralInfo();

    const totalStats = useTotalStats(items);

    useEffect(() => setIsClient(true), []);

    const handleClearAll = useCallback(() => {
        clearItems();
        clearGeneralInfo();
    }, [clearItems, clearGeneralInfo]);

    const handleSubmit = useCallback(() => {
        const isGeneralInfoValid = validateGeneralInfoData();
        const areItemsValid = validateAllItems();

        if (!isGeneralInfoValid || !areItemsValid) {
            toast.error("Исправьте ошибки перед отправкой");
            return;
        }

        const submitData = { generalInfo, items, totalStats };
        console.log("Form data:", submitData);
        toast.success("Данные успешно отправлены");
    }, [generalInfo, items, totalStats, validateGeneralInfoData, validateAllItems]);

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

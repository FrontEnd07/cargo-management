"use client";

import { useCallback, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useItems } from "./use-items";
import { useGeneralInfo } from "./use-general-info";
import { useTotalStats } from "./use-total-stats";
import { trpc } from 'app/_trpcClient';
import { handleTRPCError } from "6_shared/lib";

export const useItemCalculator = () => {
    const [isClient, setIsClient] = useState(false);

    const {
        mutate: itemCreate,
        isPending: isPendingCreateItem
    } = trpc.Customer.AddCustomer.useMutation({
        onSuccess: (data) => {

        },

        onError: (error) => {
            handleTRPCError(error)
        }
    })

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
        // itemCreate(submitData);
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
        isPendingCreateItem,
        handleGeneralInfoChange
    };
};

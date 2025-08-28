"use client"

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
        mutate: createItems,
        isPending: isPendingCreateItem
    } = trpc.Items.createItems.useMutation({
        onSuccess: (data) => {
            toast.success("Товары успешно созданы");
            console.log("Успешно создан документ:", data);
            // Можно добавить очистку формы после успешного создания
            // handleClearAll();
        },
        onError: (error) => {
            handleTRPCError(error);
            toast.error("Ошибка при создании товаров");
        }
    });

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

        // Формируем данные в соответствии с itemsSchema
        const submitData = {
            generalInfo: {
                employeeId: generalInfo.employeeId,
                warehouseId: generalInfo.warehouseId,
                date: generalInfo.date,
                customerId: generalInfo.customerId || undefined // делаем optional
            },
            items: items.map(item => ({
                name: item.name,
                length: item.length,
                width: item.width,
                height: item.height,
                quantity: item.quantity,
                kgPerUnit: item.kgPerUnit,
                customerCode: item.customerCode,
                customerName: item.customerName,
                productRoutes: item.productRoutes,
                shop: item.shop || "",
                expense: item.expense || "",
                currency: item.currency || "",
                note: item.note || ""
            })),
            totalStats: {
                totalVolume: totalStats.totalVolume,
                totalWeight: totalStats.totalWeight,
                avgRation: totalStats.avgRation
            }
        };

        console.log("Отправляемые данные:", submitData);

        if (!isPendingCreateItem) {
            createItems(submitData);
        }
    }, [
        generalInfo,
        items,
        totalStats,
        validateGeneralInfoData,
        validateAllItems,
        createItems,
        isPendingCreateItem
    ]);

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

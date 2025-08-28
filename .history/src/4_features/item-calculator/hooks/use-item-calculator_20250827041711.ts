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
            toast.success("Данные успешно отправлены");
            console.log("Успешно создан клиент:", data);
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

    // Функция для преобразования данных в формат, ожидаемый мутацией AddCustomer
    const transformToCustomerData = useCallback((submitData: { generalInfo: any; items: any[]; totalStats: any }) => {
        return {
            name: submitData.generalInfo?.customerName || submitData.generalInfo?.name || '',
            phone: submitData.generalInfo?.phone || submitData.generalInfo?.phoneNumber || '',
            date: submitData.generalInfo?.date ? new Date(submitData.generalInfo.date) : new Date(),
            address: submitData.generalInfo?.address || submitData.generalInfo?.customerAddress || '',
            codes: submitData.items?.map((item: any) => item.customerCode || item.code).filter(Boolean) || []
        };
    }, []);

    const handleSubmit = useCallback(() => {
        const isGeneralInfoValid = validateGeneralInfoData();
        const areItemsValid = validateAllItems();

        if (!isGeneralInfoValid || !areItemsValid) {
            toast.error("Исправьте ошибки перед отправкой");
            return;
        }

        const submitData = { generalInfo, items, totalStats };
        console.log("Original form data:", submitData);

        // Преобразуем данные в нужный формат для мутации
        const customerData = transformToCustomerData(submitData);
        console.log("Transformed customer data:", customerData);

        // Проверяем, что обязательные поля заполнены
        if (!customerData.name || !customerData.phone) {
            toast.error("Заполните имя и телефон клиента");
            return;
        }

        if (!isPendingCreateItem) {
            itemCreate(customerData);
        }
    }, [generalInfo, items, totalStats, validateGeneralInfoData, validateAllItems, transformToCustomerData, itemCreate, isPendingCreateItem]);

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
"use client"

import React from 'react';
import { ItemTable } from '4_features/item-calculator';
import { StatisticsPanel } from '4_features/item-calculator';
import { ControlButtons } from '4_features/item-calculator';
import { useItemCalculator } from '4_features/item-calculator';
import { GeneralInfoBlock } from "./general-info-block.tsx";
import { Loader2 } from "lucide-react";
import { trpc } from 'app/_trpcClient';
import { handleTRPCError } from "6_shared/lib";
import { toast } from "react-toastify";
import { useGeneralInfo, useTotalStats } from "4_features/item-calculator";

export const CreateItems = () => {
    // Если у вас есть правильная мутация для создания товаров, используйте её
    // Например: trpc.Items.CreateItems.useMutation или подобную
    const {
        mutate: createCustomer,
        isPending: isPendingCreateCustomer
    } = trpc.Customer.AddCustomer.useMutation({
        onSuccess: (data) => {
            console.log("Клиент успешно создан:", data);
            toast.success("Данные успешно отправлены");
        },
        onError: (error) => {
            handleTRPCError(error)
        }
    });

    const calculator = useItemCalculator();

    // Функция для преобразования данных в формат, ожидаемый мутацией AddCustomer
    const transformDataForCustomer = (submitData: any) => {
        // Преобразуйте ваши данные в формат, который ожидает AddCustomer
        return {
            name: submitData.generalInfo?.customerName || '',
            phone: submitData.generalInfo?.phone || '',
            date: new Date(submitData.generalInfo?.date || new Date()),
            address: submitData.generalInfo?.address || '',
            codes: submitData.items?.map((item: any) => item.code).filter(Boolean) || []
        };
    };

    const handleSubmit = () => {
        // Используем методы валидации из хука, если они доступны
        // Возможно нужно будет экспортировать эти функции из соответствующих хуков
        const isGeneralInfoValid = true; // заместите реальной валидацией
        const areItemsValid = true; // заместите реальной валидацией

        if (!isGeneralInfoValid || !areItemsValid) {
            toast.error("Исправьте ошибки перед отправкой");
            return;
        }

        const submitData = {
            generalInfo: calculator.generalInfo,
            items: calculator.items,
            totalStats: calculator.totalStats
        };

        console.log("Form data:", submitData);

        if (!isPendingCreateCustomer) {
            // Преобразуем данные в нужный формат
            const customerData = transformDataForCustomer(submitData);
            createCustomer(customerData);
        }
    };

    if (!calculator.isClient) {
        return (
            <div className="flex flex-col items-center justify-center">
                <Loader2 className="animate-spin text-blue-500 mb-2" />
                <span className="text-gray-500">Загрузка...</span>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mt-4">
            <div className="space-y-6">
                <GeneralInfoBlock
                    generalInfo={calculator.generalInfo}
                    errors={calculator.generalInfoErrors}
                    onChange={calculator.handleGeneralInfoChange}
                />

                <ItemTable
                    items={calculator.items}
                    validationErrors={calculator.validationErrors}
                    onItemChange={calculator.handleItemChange}
                    onRemoveItem={calculator.handleRemoveItem}
                />

                <StatisticsPanel stats={calculator.totalStats} />

                <ControlButtons
                    itemsCount={calculator.items.length}
                    onAddItem={calculator.handleAddItem}
                    onSubmit={handleSubmit}
                    onClearAll={calculator.handleClearAll}
                    isLoading={isPendingCreateCustomer}
                />

                {/* Инструкции по использованию */}
                <div className="bg-yellow-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-yellow-900 mb-2">Как использовать:</h3>
                    <ol className="text-sm text-yellow-700 space-y-1 list-decimal list-inside">
                        <li>Выберите сотрудника и склад в верхней части формы</li>
                        <li>Укажите дату получения товара</li>
                        <li>Введите название товара</li>
                        <li>Укажите размеры в сантиметрах (длина, ширина, высота)</li>
                        <li>Введите количество единиц и вес одной единицы в кг</li>
                        <li>Выберите код клиента, имя клиента и направление</li>
                        <li>Объем, общий вес и соотношение рассчитаются автоматически</li>
                        <li>Используйте кнопки для добавления/удаления строк</li>
                        <li>Поля будут подсвечены зеленым при корректном вводе и красным при ошибках</li>
                    </ol>
                </div>
            </div>
        </div>
    );
};
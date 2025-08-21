"use client"

import React from 'react';
import { ItemTable } from '4_features/item-calculator';
import { StatisticsPanel } from '4_features/item-calculator';
import { ControlButtons } from '4_features/item-calculator';
import { useItemCalculator } from '4_features/item-calculator';


export const CreateItems = () => {
    const {
        isClient,
        items,
        validationErrors,
        totalStats,
        handleItemChange,
        handleAddItem,
        handleRemoveItem,
        handleClearAll,
        handleSubmit
    } = useItemCalculator();

    if (!isClient) {
        return (
            <div className="max-w-7xl">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        Калькулятор объема и веса
                    </h1>
                    <p className="text-gray-600">
                        Загрузка...
                    </p>
                </div>
                <div className="animate-pulse">
                    <div className="h-64 bg-gray-200 rounded-xl"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl">

            <div className="space-y-6">
                <ItemTable
                    items={items}
                    validationErrors={validationErrors}
                    onItemChange={handleItemChange}
                    onRemoveItem={handleRemoveItem}
                />

                <StatisticsPanel stats={totalStats} />

                <ControlButtons
                    itemsCount={items.length}
                    onAddItem={handleAddItem}
                    onSubmit={handleSubmit}
                    onClearAll={handleClearAll}
                />

                {/* Инструкции по использованию */}
                <div className="bg-yellow-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-yellow-900 mb-2">Как использовать:</h3>
                    <ol className="text-sm text-yellow-700 space-y-1 list-decimal list-inside">
                        <li>Введите название товара</li>
                        <li>Укажите размеры в сантиметрах (длина, ширина, высота)</li>
                        <li>Введите количество единиц и вес одной единицы в кг</li>
                        <li>Объем, общий вес и соотношение рассчитаются автоматически</li>
                        <li>Используйте кнопки для добавления/удаления строк</li>
                        <li>Поля будут подсвечены зеленым при корректном вводе и красным при ошибках</li>
                    </ol>
                </div>
            </div>
        </div>
    );
}
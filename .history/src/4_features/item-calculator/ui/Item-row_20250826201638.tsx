"use client";

import React, { memo, useCallback } from "react";
import { Item, ValidationErrors } from "5_entities/receive-products";
import { Button } from "6_shared/ui";
import { useProductRoutesLoader } from "4_features/item-calculator"
import { useCurrencyLoader } from "5_entities/currency";

import {
    EditableCell,
    ReadOnlyCell,
    CustomerCodeSelect,
    CustomerNameSelect,
    ProductRoutesSelect,
    useItemRowHandlers
} from "./row-children";

interface ItemRowProps {
    item: Item;
    index: number;
    onChange: (index: number, field: keyof Item, value: string) => void;
    onRemove: (index: number) => void;
    errors?: ValidationErrors;
}

// ✅ Вынесены за пределы компонента для правильной мемоизации
const MemoizedEditableCell = memo(EditableCell);
const MemoizedReadOnlyCell = memo(ReadOnlyCell);
const MemoizedCustomerCodeSelect = memo(CustomerCodeSelect);
const MemoizedCustomerNameSelect = memo(CustomerNameSelect);
const MemoizedProductRoutesSelect = memo(ProductRoutesSelect);

export const ItemRow = memo<ItemRowProps>(({
    item,
    index,
    onChange,
    onRemove,
    errors = {}
}) => {
    // ✅ Хуки вынесены на верхний уровень
    const loadProductRoutes = useProductRoutesLoader();
    const loadCurrency = useCurrencyLoader();

    // ✅ Стабильные обработчики
    const { handleInput, handleSelectChange, handleCode, handleProductRoutes, handleCurrency } = useItemRowHandlers(
        index,
        onChange
    );

    // ✅ Стабильный обработчик удаления
    const handleRemove = useCallback(() => {
        onRemove(index);
    }, [onRemove, index]);

    // ✅ Оптимизированный обработчик кода - убрана зависимость от item
    const handleCodeChange = useCallback((value: any) => {
        handleCode(value, item.customerName);
    }, [handleCode, item.customerName]);

    return (
        <div className="dark:bg-gray-800 bg-white p-4 pt-7 [&:not(:last-child)]:border-b dark:border-gray-700 border-gray-200">
            {/* Редактируемые поля */}
            <div className="mb-7 border px-4 py-4 border-gray-300 dark:border-gray-600 sm:rounded-lg relative">
                <div className="font-semibold text-gray-900 mb-2 dark:text-gray-300 absolute -top-4 bg-white px-3 dark:bg-gray-800">
                    Информация о товаре*
                </div>
                <div className="grid grid-cols-3 gap-3 items-end">
                    <div className="!py-1 !px-1">
                        <MemoizedEditableCell
                            label="Длина (см)"
                            field="length"
                            item={item}
                            onChange={handleInput}
                            errors={errors}
                            type="number"
                            step="0.01"
                        />
                    </div>
                    <div className="!py-1 !px-1">
                        <MemoizedEditableCell
                            label="Ширина (см)"
                            field="width"
                            item={item}
                            onChange={handleInput}
                            errors={errors}
                            type="number"
                            step="0.01"
                        />
                    </div>
                    <div className="!py-1 !px-1">
                        <MemoizedEditableCell
                            label="Высота (см)"
                            field="height"
                            item={item}
                            onChange={handleInput}
                            errors={errors}
                            type="number"
                            step="0.01"
                        />
                    </div>
                    <div className="!py-1 !px-1">
                        <MemoizedEditableCell
                            label="Название товара"
                            field="name"
                            item={item}
                            onChange={handleInput}
                            errors={errors}
                        />
                    </div>
                    <div className="!py-1 !px-1">
                        <MemoizedEditableCell
                            label="Количество"
                            field="quantity"
                            item={item}
                            onChange={handleInput}
                            errors={errors}
                            type="number"
                        />
                    </div>
                    <div className="!py-1 !px-1">
                        <MemoizedEditableCell
                            label="Вес за ед. (кг)"
                            field="kgPerUnit"
                            item={item}
                            onChange={handleInput}
                            errors={errors}
                            type="number"
                            step="0.01"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-3 items-end">
                    <div className="!py-1 !px-1 min-w-[90px]">
                        <MemoizedCustomerCodeSelect
                            label="Код клиента"
                            value={item.customerCode}
                            onChange={handleCodeChange}
                            error={errors.customerCode}
                        />
                    </div>
                    <div className="!py-1 !px-1 min-w-[90px]">
                        <MemoizedCustomerNameSelect
                            label="Имя клиента"
                            value={item.customerName}
                            code={item.customerCode}
                            onChange={handleSelectChange}
                            error={errors.customerName}
                        />
                    </div>
                    <div className="!py-1 !px-1 min-w-[90px]">
                        <MemoizedProductRoutesSelect
                            label="Направление"
                            value={item.productRoutes}
                            loadingData={loadProductRoutes}

"use client";

import React, { memo, useMemo, useCallback } from "react";
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
} from "./row-children";

interface ItemRowProps {
    item: Item;
    index: number;
    onChange: (index: number, field: keyof Item, value: string) => void;
    onRemove: (index: number) => void;
    errors?: ValidationErrors;
}

export const ItemRow = memo<ItemRowProps>(
    ({ item, index, onChange, onRemove, errors = {} }) => {
        const loadProductRoutes = useProductRoutesLoader();
        const loadCurrency = useCurrencyLoader();

        // Мемоизируем обработчики
        const handlers = useMemo(() => ({
            handleInput: (field: keyof Item) => (e: React.ChangeEvent<HTMLInputElement>) => {
                onChange(index, field, e.target.value);
            },

            handleSelectChange: (field: keyof Item) => (value: any) => {
                const stringValue = value?.label || value || '';
                onChange(index, field, stringValue);
            },

            handleCode: (value: any) => {
                const code = value?.label || value || '';
                onChange(index, 'customerCode', code);
                // Сбрасываем имя клиента при смене кода
                if (item.customerName) {
                    onChange(index, 'customerName', '');
                }
            },

            handleRemove: () => onRemove(index)
        }), [index, item.customerName, onChange, onRemove]);

        return (
            <div className="dark:bg-gray-800 bg-white p-4 pt-7 [&:not(:last-child)]:border-b dark:border-gray-700 border-gray-200">
                {/* Информация о товаре */}
                <div className="mb-7 border px-4 py-4 border-gray-300 dark:border-gray-600 sm:rounded-lg relative">
                    <div className="font-semibold text-gray-900 mb-2 dark:text-gray-300 absolute -top-4 bg-white px-3 dark:bg-gray-800">
                        Информация о товаре*
                    </div>

                    <div className="grid grid-cols-3 gap-3 items-end">
                        <div className="!py-1 !px-1">
                            <EditableCell
                                label="Длина (см)"
                                field="length"
                                item={item}
                                onChange={handlers.handleInput}
                                errors={errors}
                                type="number"
                                step="0.01"
                            />
                        </div>
                        <div className="!py-1 !px-1">
                            <EditableCell
                                label="Ширина (см)"
                                field="width"
                                item={item}
                                onChange={handlers.handleInput}
                                errors={errors}
                                type="number"
                                step="0.01"
                            />
                        </div>
                        <div className="!py-1 !px-1">
                            <EditableCell
                                label="Высота (см)"
                                field="height"
                                item={item}
                                onChange={handlers.handleInput}
                                errors={errors}
                                type="number"
                                step="0.01"
                            />
                        </div>
                        <div className="!py-1 !px-1">
                            <EditableCell
                                label="Название товара"
                                field="name"
                                item={item}
                                onChange={handlers.handleInput}
                                errors={errors}
                            />
                        </div>
                        <div className="!py-1 !px-1">
                            <EditableCell
                                label="Количество"
                                field="quantity"
                                item={item}
                                onChange={handlers.handleInput}
                                errors={errors}
                                type="number"
                            />
                        </div>
                        <div className="!py-1 !px-1">
                            <EditableCell
                                label="Вес за ед. (кг)"
                                field="kgPerUnit"
                                item={item}
                                onChange={handlers.handleInput}
                                errors={errors}
                                type="number"
                                step="0.01"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 items-end">
                        <div className="!py-1 !px-1 min-w-[90px]">
                            <CustomerCodeSelect
                                label="Код клиента"
                                value={item.customerCode}
                                onChange={handlers.handleCode}
                                error={errors.customerCode}
                                index={index}
                            />
                        </div>
                        <div className="!py-1 !px-1 min-w-[90px]">
                            <CustomerNameSelect
                                label="Имя клиента"
                                value={item.customerName}
                                code={item.customerCode}
                                onChange={handlers.handleSelectChange}
                                error={errors.customerName}
                                index={index}
                            />
                        </div>
                        <div className="!py-1 !px-1 min-w-[90px]">
                            <ProductRoutesSelect
                                keyProps="product-routes"
                                label="Направление"
                                value={item.productRoutes}
                                loadingData={loadProductRoutes}
                                onChange={handlers.handleSelectChange('productRoutes')}
                                index={index}
                                error={errors.productRoutes}
                            />
                        </div>
                    </div>
                </div>

                {/* Остальные секции... */}

                <div className="!py-1 !px-1">
                    <Button variant="danger" onClick={handlers.handleRemove}>
                        Удалить
                    </Button>
                </div>
            </div>
        );
    }
);

ItemRow.displayName = "ItemRow";
"use client";

import React, { memo, useMemo } from "react";
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

                {/* Редактируемые поля */}
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

                {/* Селекты */}


                {/* Автоматические вычисления */}
                <div className="mb-7 border px-4 py-4 border-gray-300 dark:border-gray-600 relative sm:rounded-lg">
                    <div className="font-semibold text-gray-900 mb-2 dark:text-gray-300 absolute -top-4 bg-white px-3 dark:bg-gray-800">Общая статистика</div>
                    <div className="grid grid-cols-3 gap-3 items-end">
                        <div className="!py-1 !px-1">
                            <ReadOnlyCell label="Общий объем (м³)" value={item.totalVolume} placeholder="Автоматически" />
                        </div>
                        <div className="!py-1 !px-1">
                            <ReadOnlyCell label="Общий вес (кг)" value={item.totalWeight} placeholder="Автоматически" />
                        </div>
                        <div className="!py-1 !px-1">
                            <ReadOnlyCell label="Соотношение" value={item.ratio} placeholder="Автоматически" />
                        </div>
                    </div>
                </div>
                <div className="mb-4 border px-4 py-4 border-gray-300 dark:border-gray-600 relative sm:rounded-lg">
                    <div className="font-semibold text-gray-900 mb-2 dark:text-gray-300 absolute -top-4 bg-white px-3 dark:bg-gray-800">Дополнительные данные</div>
                    <div className="grid grid-cols-3 gap-3 items-end">
                        <div className="!py-1 !px-1">
                            <EditableCell label="Сумма расхода" field="expense" item={item} onChange={handleInput} errors={errors} type="number" step="0.01" />
                        </div>
                        <div className="!py-1 !px-1 min-w-[90px]">
                            <ProductRoutesSelect keyProps="currency" loadingData={loadCurrency} label="Валюта" value={item.currency} onChange={handleCurrency} index={index} />
                        </div>
                        <div className="!py-1 !px-1">
                            <EditableCell label="Магазин" field="shop" item={item} onChange={handleInput} errors={errors} />
                        </div>
                        <div className="!py-1 !px-1 col-span-full">
                            <EditableCell label="Примечание" field="note" item={item} onChange={handleInput} errors={errors} />
                        </div>
                    </div>
                </div>
                {/* Удаление */}
                <div className="!py-1 !px-1">
                    <Button variant="danger" onClick={() => onRemove(index)}>Удалить</Button>
                </div>
            </div >
        );
    }
);

ItemRow.displayName = "ItemRow";

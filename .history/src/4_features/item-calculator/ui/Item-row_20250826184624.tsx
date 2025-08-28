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

// Мемоизированные компоненты
const MemoizedEditableCell = memo(EditableCell);
const MemoizedReadOnlyCell = memo(ReadOnlyCell);
const MemoizedCustomerCodeSelect = memo(CustomerCodeSelect);
const MemoizedCustomerNameSelect = memo(CustomerNameSelect);
const MemoizedProductRoutesSelect = memo(ProductRoutesSelect);

export const ItemRow = memo<ItemRowProps>(
    ({ item, index, onChange, onRemove, errors = {} }) => {
        const loadProductRoutes = useProductRoutesLoader();
        const loadCurrency = useCurrencyLoader();

        // Стабильные обработчики без зависимости от item
        const { handleInput, handleSelectChange, handleCode, handleProductRoutes, handleCurrency } = useItemRowHandlers(
            index,
            onChange
        );

        // Мемоизированный обработчик удаления
        const handleRemove = useCallback(() => {
            onRemove(index);
        }, [onRemove, index]);

        // Создаем обработчик кода с текущим именем клиента
        const handleCodeChange = useCallback((value: any) => {
            handleCode(value, item.customerName);
        }, [handleCode, item.customerName]);

        return (
            <div className="dark:bg-gray-800 bg-white p-4 pt-7 [&:not(:last-child)]:border-b dark:border-gray-700 border-gray-200">

                {/* Редактируемые поля */}
                <div className="mb-7 border px-4 py-4 border-gray-300 dark:border-gray-600 sm:rounded-lg relative">
                    <div className="font-semibold text-gray-900 mb-2 dark:text-gray-300 absolute -top-4 bg-white px-3 dark:bg-gray-800">Информация о товаре*</div>
                    <div className="grid grid-cols-3 gap-3 items-end">
                        <div className="!py-1 !px-1">
                            <MemoizedEditableCell label="Длина (см)" field="length" item={item} onChange={handleInput} errors={errors} type="number" step="0.01" />
                        </div>
                        <div className="!py-1 !px-1">
                            <MemoizedEditableCell label="Ширина (см)" field="width" item={item} onChange={handleInput} errors={errors} type="number" step="0.01" />
                        </div>
                        <div className="!py-1 !px-1">
                            <MemoizedEditableCell label="Высота (см)" field="height" item={item} onChange={handleInput} errors={errors} type="number" step="0.01" />
                        </div>
                        <div className="!py-1 !px-1">
                            <MemoizedEditableCell label="Название товара" field="name" item={item} onChange={handleInput} errors={errors} />
                        </div>
                        <div className="!py-1 !px-1">
                            <MemoizedEditableCell label="Количество" field="quantity" item={item} onChange={handleInput} errors={errors} type="number" />
                        </div>
                        <div className="!py-1 !px-1">
                            <MemoizedEditableCell label="Вес за ед. (кг)" field="kgPerUnit" item={item} onChange={handleInput} errors={errors} type="number" step="0.01" />
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3 items-end">
                        <div className="!py-1 !px-1 min-w-[90px]">
                            <MemoizedCustomerCodeSelect label="Код клиента" value={item.customerCode} onChange={handleCodeChange} error={errors.customerCode} index={index} />
                        </div>
                        <div className="!py-1 !px-1 min-w-[90px]">
                            <MemoizedCustomerNameSelect label="Имя клиента" value={item.customerName} code={item.customerCode} onChange={handleSelectChange} error={errors.customerName} index={index} />
                        </div>
                        <div className="!py-1 !px-1 min-w-[90px]">
                            <MemoizedProductRoutesSelect keyProps="product-routes" label="Направление" value={item.productRoutes} loadingData={loadProductRoutes} onChange={handleProductRoutes} index={index} error={errors.productRoutes} />
                        </div>
                    </div>
                </div>

                {/* Автоматические вычисления */}
                <div className="mb-7 border px-4 py-4 border-gray-300 dark:border-gray-600 relative sm:rounded-lg">
                    <div className="font-semibold text-gray-900 mb-2 dark:text-gray-300 absolute -top-4 bg-white px-3 dark:bg-gray-800">Общая статистика</div>
                    <div className="grid grid-cols-3 gap-3 items-end">
                        <div className="!py-1 !px-1">
                            <MemoizedReadOnlyCell label="Общий объем (м³)" value={item.totalVolume} placeholder="Автоматически" />
                        </div>
                        <div className="!py-1 !px-1">
                            <MemoizedReadOnlyCell label="Общий вес (кг)" value={item.totalWeight} placeholder="Автоматически" />
                        </div>
                        <div className="!py-1 !px-1">
                            <MemoizedReadOnlyCell label="Соотношение" value={item.ratio} placeholder="Автоматически" />
                        </div>
                    </div>
                </div>

                <div className="mb-4 border px-4 py-4 border-gray-300 dark:border-gray-600 relative sm:rounded-lg">
                    <div className="font-semibold text-gray-900 mb-2 dark:text-gray-300 absolute -top-4 bg-white px-3 dark:bg-gray-800">Дополнительные данные</div>
                    <div className="grid grid-cols-3 gap-3 items-end">
                        <div className="!py-1 !px-1">
                            <MemoizedEditableCell label="Сумма расхода" field="expense" item={item} onChange={handleInput} errors={errors} type="number" step="0.01" />
                        </div>
                        <div className="!py-1 !px-1 min-w-[90px]">
                            <MemoizedProductRoutesSelect keyProps="currency" loadingData={loadCurrency} label="Валюта" value={item.currency} onChange={handleCurrency} index={index} />
                        </div>
                        <div className="!py-1 !px-1">
                            <MemoizedEditableCell label="Магазин" field="shop" item={item} onChange={handleInput} errors={errors} />
                        </div>
                        <div className="!py-1 !px-1 col-span-full">
                            <MemoizedEditableCell label="Примечание" field="note" item={item} onChange={handleInput} errors={errors} />
                        </div>
                    </div>
                </div>

                {/* Удаление */}
                <div className="!py-1 !px-1">
                    <Button variant="danger" onClick={handleRemove}>Удалить</Button>
                </div>
            </div >
        );
    }
);

ItemRow.displayName = "ItemRow";
"use client";

import React, { memo } from "react";
import { Item, ValidationErrors } from "5_entities/receive-products";
import { TableRow, TableCell, Button } from "6_shared/ui";

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
        const { handleInput, handleSelectChange, handleCode, handleProductRoutes } = useItemRowHandlers(
            index,
            item,
            onChange
        );

        return (
            <TableRow>
                <TableCell className="!py-3 !px-3">{index + 1}</TableCell>

                {/* Редактируемые поля */}
                <TableCell className="!py-1 !px-1">
                    <EditableCell field="name" item={item} onChange={handleInput} errors={errors} />
                </TableCell>
                <TableCell className="!py-1 !px-1">
                    <EditableCell field="length" item={item} onChange={handleInput} errors={errors} type="number" step="0.01" />
                </TableCell>
                <TableCell className="!py-1 !px-1">
                    <EditableCell field="width" item={item} onChange={handleInput} errors={errors} type="number" step="0.01" />
                </TableCell>
                <TableCell className="!py-1 !px-1">
                    <EditableCell field="height" item={item} onChange={handleInput} errors={errors} type="number" step="0.01" />
                </TableCell>
                <TableCell className="!py-1 !px-1">
                    <EditableCell field="quantity" item={item} onChange={handleInput} errors={errors} type="number" />
                </TableCell>
                <TableCell className="!py-1 !px-1">
                    <EditableCell field="kgPerUnit" item={item} onChange={handleInput} errors={errors} type="number" step="0.01" />
                </TableCell>

                {/* Автоматические вычисления */}
                <TableCell className="!py-1 !px-1">
                    <ReadOnlyCell value={item.totalVolume} placeholder="Автоматически" />
                </TableCell>
                <TableCell className="!py-1 !px-1">
                    <ReadOnlyCell value={item.totalWeight} placeholder="Автоматически" />
                </TableCell>
                <TableCell className="!py-1 !px-1">
                    <ReadOnlyCell value={item.ratio} placeholder="Автоматически" />
                </TableCell>

                {/* Селекты */}
                <TableCell className="!py-1 !px-1 min-w-[90px]">
                    <CustomerCodeSelect value={item.customerCode} onChange={handleCode} error={errors.customerCode} index={index} />
                </TableCell>
                <TableCell className="!py-1 !px-1 min-w-[90px]">
                    <CustomerNameSelect value={item.customerName} code={item.customerCode} onChange={handleSelectChange} error={errors.customerName} index={index} />
                </TableCell>
                <TableCell className="!py-1 !px-1 min-w-[90px]">
                    <ProductRoutesSelect value={item.productRoutes} onChange={handleProductRoutes} index={index} error={errors.productRoutes} />
                </TableCell>

                {/* Удаление */}
                <TableCell className="!py-1 !px-1">
                    <Button variant="danger" onClick={() => onRemove(index)}>Удалить</Button>
                </TableCell>
            </TableRow>
        );
    }
);

ItemRow.displayName = "ItemRow";

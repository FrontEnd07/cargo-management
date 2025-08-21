"use client";

import React, { memo } from "react";
import { Item, ValidationErrors } from "5_entities/receive-products";
import { TableRow, TableCell, Button } from "6_shared/ui";

import {
    EditableCell,
    ReadOnlyCell,
    CustomerCodeSelect,
    CustomerNameSelect,
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
        const { handleInput, handleSelectChange, handleCode } = useItemRowHandlers(
            index,
            item,
            onChange
        );

        return (
            <TableRow>
                <TableCell>{index + 1}</TableCell>

                {/* Редактируемые поля */}
                <TableCell>
                    <EditableCell field="name" item={item} onChange={handleInput} errors={errors} />
                </TableCell>
                <TableCell>
                    <EditableCell field="length" item={item} onChange={handleInput} errors={errors} type="number" step="0.01" />
                </TableCell>
                <TableCell>
                    <EditableCell field="width" item={item} onChange={handleInput} errors={errors} type="number" step="0.01" />
                </TableCell>
                <TableCell>
                    <EditableCell field="height" item={item} onChange={handleInput} errors={errors} type="number" step="0.01" />
                </TableCell>
                <TableCell>
                    <EditableCell field="quantity" item={item} onChange={handleInput} errors={errors} type="number" />
                </TableCell>
                <TableCell>
                    <EditableCell field="kgPerUnit" item={item} onChange={handleInput} errors={errors} type="number" step="0.01" />
                </TableCell>

                {/* Автоматические вычисления */}
                <TableCell>
                    <ReadOnlyCell value={item.totalVolume} placeholder="Автоматически" />
                </TableCell>
                <TableCell>
                    <ReadOnlyCell value={item.totalWeight} placeholder="Автоматически" />
                </TableCell>
                <TableCell>
                    <ReadOnlyCell value={item.ratio} placeholder="Автоматически" />
                </TableCell>

                {/* Селекты */}
                <TableCell>
                    <CustomerCodeSelect value={item.customerCode} onChange={handleCode} error={errors.customerCode} index={index} />
                </TableCell>
                <TableCell>
                    <CustomerNameSelect value={item.customerName} code={item.customerCode} onChange={handleSelectChange} error={errors.customerName} index={index} />
                </TableCell>

                {/* Удаление */}
                <TableCell>
                    <Button variant="danger" onClick={() => onRemove(index)}>Удалить</Button>
                </TableCell>
            </TableRow>
        );
    }
);

ItemRow.displayName = "ItemRow";

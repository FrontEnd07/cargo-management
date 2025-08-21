import React, { useMemo } from 'react';
import { Item, ValidationErrors } from '5_entities/receive-products';
import { ItemRow, } from './Item-row';
import { TABLE_HEADERS } from '5_entities/receive-products';
import { Table, TableHead, TableBody, TableRow, TableHeader } from "6_shared/ui"

interface ItemTableProps {
    items: Item[];
    validationErrors: Record<string, ValidationErrors>;
    onItemChange: (index: number, field: keyof Item, value: string) => void;
    onRemoveItem: (index: number) => void;
}

export const ItemTable: React.FC<ItemTableProps> = ({
    items,
    validationErrors,
    onItemChange,
    onRemoveItem
}) => {
    const headerCells = useMemo(() =>
        TABLE_HEADERS.map((header, key) => (
            <TableHead key={key} className="!p-1">
                {header}
            </TableHead>
        )), []);

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {headerCells}
                </TableRow>
            </TableHeader>
            <TableBody>
                {items.map((item, index) => (
                    <ItemRow
                        key={item.id}
                        item={item}
                        index={index}
                        onChange={onItemChange}
                        onRemove={onRemoveItem}
                        errors={validationErrors[item.id]}
                    />
                ))}
            </TableBody>
        </Table>
    );
};
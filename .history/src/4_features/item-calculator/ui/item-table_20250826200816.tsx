import React, { memo } from 'react';
import { Item, ValidationErrors } from '5_entities/receive-products';
import { ItemRow } from './Item-row';

interface ItemTableProps {
    items: Item[];
    validationErrors: Record<string, ValidationErrors>;
    onItemChange: (index: number, field: keyof Item, value: string) => void;
    onRemoveItem: (index: number) => void;
}

// Добавляем memo с кастомным сравнением
export const ItemTable = memo<ItemTableProps>(({
    items,
    validationErrors,
    onItemChange,
    onRemoveItem
}) => {
    return (
        <div className='shadow-md sm:rounded-lg overflow-hidden'>
            {items.map((item, index) => (
                <ItemRow
                    key={item.id} // ✅ Хорошо - используем уникальный id
                    item={item}
                    index={index}
                    onChange={onItemChange}
                    onRemove={onRemoveItem}
                    errors={validationErrors[item.id]}
                />
            ))}
        </div>
    );
}, (prevProps, nextProps) => {
    // Кастомное сравнение пропсов
    return (
        prevProps.items === nextProps.items && // Сравнение по ссылке
        prevProps.validationErrors === nextProps.validationErrors &&
        prevProps.onItemChange === nextProps.onItemChange &&
        prevProps.onRemoveItem === nextProps.onRemoveItem
    );
});
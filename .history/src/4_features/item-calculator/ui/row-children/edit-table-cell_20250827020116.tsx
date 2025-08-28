import React, { memo } from 'react';
import { Input } from '6_shared/ui';
import { Item, ValidationErrors } from '5_entities/receive-products';

interface EditableCellProps {
    label: string;
    field: keyof Item;
    item: Item;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // ✅ Принимаем готовый обработчик
    errors: ValidationErrors;
    type?: string;
    step?: string;
}

export const EditableCell = memo<EditableCellProps>(({
    label,
    field,
    item,
    onChange,
    errors,
    type = "text",
    step
}) => {
    return (
        <Input
            label={label}
            type={type}
            step={step}
            value={item[field] || ''}
            onChange={onChange} // ✅ Просто передаем обработчик
            errors={errors[field]}
            placeholder={label}
            showError={false}
        />
    );
});

EditableCell.displayName = 'EditableCell';
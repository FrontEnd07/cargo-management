import React, { memo, useCallback } from "react";
import { Input } from "6_shared/ui";
import { Item, ValidationErrors } from "5_entities/receive-products";

interface EditableCellProps {
    field: keyof Item;
    item: Item;
    onChange: (field: keyof Item, value: string) => void;
    errors?: ValidationErrors;
    type?: string;
    label?: string;
    step?: string;
}

export const EditableCell = memo<EditableCellProps>(({
    field,
    item,
    onChange,
    errors,
    type = "text",
    step,
    label
}) => {
    // Мемоизируем обработчик изменения
    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(field, e.target.value);
    }, [onChange, field]);

    // Мемоизируем значение и ошибку
    const value = item[field] || "";
    const error = errors?.[field];

    return (
        <Input
            type={type}
            step={step}
            label={label}
            value={value}
            onChange={handleChange}
            errors={error}
            showError={false}
        />
    );
});

EditableCell.displayName = "EditableCell";
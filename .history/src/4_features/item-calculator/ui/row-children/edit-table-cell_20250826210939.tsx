import { memo } from "react";
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

export const EditableCell = memo(({ field, item, onChange, errors, type = "text", step, label }: EditableCellProps) => (
    <Input
        type={type}
        step={step}
        label={label}
        value={item[field] || ""}
        onChange={e => onChange(field, e.target.value)}
        errors={errors?.[field]}
        showError={false}
    />
), (prevProps, nextProps) => {
    return (
        prevProps.field === nextProps.field &&
        prevProps.item === nextProps.item &&
        prevProps.onChange === nextProps.onChange &&
        prevProps.errors === nextProps.errors &&
        prevProps.type === nextProps.type &&
        prevProps.step === nextProps.step &&
        prevProps.label === nextProps.label
    );
});
import React, { memo, useMemo } from "react";
import { Input } from "6_shared/ui";
import { INPUT_CLASSES } from "5_entities/receive-products";

interface ReadOnlyCellProps {
    value: string;
    placeholder: string;
    label?: string;
}

export const ReadOnlyCell = memo<ReadOnlyCellProps>(({
    value,
    placeholder,
    label
}) => {
    // Мемоизируем вычисляемые значения
    const displayValue = useMemo(() => value || "0", [value]);
    const className = useMemo(() =>
        `${INPUT_CLASSES} bg-gray-100 text-center`,
        []
    );

    return (
        <Input
            readOnly
            value={displayValue}
            label={label}
            placeholder={placeholder}
            className={className}
            showError={false}
        />
    );
});

ReadOnlyCell.displayName = "ReadOnlyCell";
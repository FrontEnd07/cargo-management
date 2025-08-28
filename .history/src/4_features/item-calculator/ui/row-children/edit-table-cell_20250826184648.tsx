export const EditableCell = memo<EditableCellProps>(({
    field,
    item,
    onChange,
    errors,
    type = "text",
    step,
    label
}) => {
    // Используйте useCallback с правильными зависимостями
    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(field, e.target.value);
    }, [field, onChange]); // Уберите item из зависимостей

    // Вычисляйте значение напрямую
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
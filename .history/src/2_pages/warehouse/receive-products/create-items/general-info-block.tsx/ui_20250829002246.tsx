import React, { memo, useCallback } from "react";
import { SelectAsync, DatePicker, DialogModal } from "6_shared/ui";
import { useWarehouses, useEmployee } from "5_entities/receive-products";
import { Plus } from 'lucide-react';
import { CreateCustomer } from "4_features/create-customer";
import { GeneralInfo, GeneralInfoErrors } from "4_features/item-calculator";

interface GeneralInfoBlockProps {
    generalInfo: GeneralInfo;
    errors: GeneralInfoErrors;
    onChange: (field: keyof GeneralInfo, value: string) => void;
}

export const GeneralInfoBlock = memo<GeneralInfoBlockProps>(({
    generalInfo,
    errors,
    onChange
}) => {
    const loadEmployee = useEmployee();
    const loadWarehouses = useWarehouses();

    // Универсальный обработчик для селектов
    const createSelectHandler = useCallback((field: keyof GeneralInfo) =>
        (value: any) => {
            const stringValue = value?.label || value || '';
            onChange(field, stringValue);
        }, [onChange]
    );

    const handleDateChange = useCallback((dateStr: string) => {
        onChange('date', dateStr);
    }, [onChange]);

    // Формирование опций для селектов
    const getSelectValue = (value: string) =>
        value ? { value, label: value } : null;

    return (
        <div className="grid grid-cols-4 gap-4 items-end">
            <SelectAsync
                label="Сотрудник"
                value={getSelectValue(generalInfo.employeeId)}
                onChange={createSelectHandler('employeeId')}
                loadOptions={loadEmployee}
                errors={errors.employeeId}
                showError={false}
                placeholder="Выберите сотрудника"
            />

            <SelectAsync
                label="Склад"
                value={getSelectValue(generalInfo.warehouseId)}
                onChange={createSelectHandler('warehouseId')}
                loadOptions={loadWarehouses}
                errors={errors.warehouseId}
                showError={false}
                placeholder="Выберите склад"
            />

            <DatePicker
                name="date-product-routes"
                label="Дата получения"
                placeholder="Дата получения"
                value={generalInfo.date}
                onChange={handleDateChange}
                errors={errors.date}
                showError={false}
            />

            <DialogModal title="Добавить клиента" icon={Plus}>
                <CreateCustomer />
            </DialogModal>
        </div>
    );
});

GeneralInfoBlock.displayName = 'GeneralInfoBlock';
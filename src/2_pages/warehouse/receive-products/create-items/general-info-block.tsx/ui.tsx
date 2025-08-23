import React, { memo, useMemo, useCallback } from "react";
import { SelectAsync, Date as DatePicker, DialogModal } from "6_shared/ui";
import { useEmployee, useWarehouses } from "2_pages/warehouse"
import { Plus } from 'lucide-react';
import { CreateCustomer } from "4_features/create-customer"
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

    // Мемоизируем обработчики для предотвращения лишних ре-рендеров
    const handleEmployeeChange = useCallback((value: any) => {
        const employeeId = value && typeof value === 'object' && 'value' in value
            ? value.label
            : (typeof value === 'string' ? value : '');
        onChange('employeeId', employeeId);
    }, [onChange]);

    const handleWarehouseChange = useCallback((value: any) => {
        const warehouseId = value && typeof value === 'object' && 'value' in value
            ? value.label
            : (typeof value === 'string' ? value : '');
        onChange('warehouseId', warehouseId);
    }, [onChange]);

    const handleDateChange = useCallback((dateStr: string) => {
        onChange('date', dateStr);
    }, [onChange]);

    // Мемоизируем значения для селектов
    const selectedEmployee = useMemo(() =>
        generalInfo.employeeId
            ? { value: generalInfo.employeeId, label: generalInfo.employeeId }
            : null,
        [generalInfo.employeeId]
    );

    const selectedWarehouse = useMemo(() =>
        generalInfo.warehouseId
            ? { value: generalInfo.warehouseId, label: generalInfo.warehouseId }
            : null,
        [generalInfo.warehouseId]
    );

    return (
        <div className="grid grid-cols-4 gap-4 items-end">
            <div>
                <SelectAsync
                    label="Сотрудник"
                    value={selectedEmployee}
                    onChange={handleEmployeeChange}
                    loadOptions={loadEmployee}
                    errors={errors.employeeId}
                    showError={false}
                    placeholder="Выберите сотрудника"
                />
            </div>
            <div>
                <SelectAsync
                    label="Склад"
                    value={selectedWarehouse}
                    onChange={handleWarehouseChange}
                    loadOptions={loadWarehouses}
                    errors={errors.warehouseId}
                    showError={false}
                    placeholder="Выберите склад"
                />
            </div>
            <div>
                <DatePicker
                    name="date-product-routes"
                    label="Дата получения"
                    placeholder="Дата получения"
                    value={generalInfo.date}
                    onChange={handleDateChange}
                    errors={errors.date}
                    showError={false}
                />
            </div>
            <div>
                <DialogModal title="Добавить клиента" icon={Plus}>
                    <CreateCustomer />
                </DialogModal>
            </div>
        </div>
    );
}, (prevProps, nextProps) => {
    // Кастомное сравнение для более точного контроля
    return (
        JSON.stringify(prevProps.generalInfo) === JSON.stringify(nextProps.generalInfo) &&
        JSON.stringify(prevProps.errors) === JSON.stringify(nextProps.errors)
    );
});

GeneralInfoBlock.displayName = 'GeneralInfoBlock';
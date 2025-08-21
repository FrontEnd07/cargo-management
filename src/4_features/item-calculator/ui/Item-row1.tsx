"use client";

import React, { useCallback, memo } from 'react';
import { Item, ValidationErrors } from '5_entities/receive-products';
import { Input, Button, SelectAsync } from '6_shared/ui';
import { INPUT_CLASSES } from "5_entities/receive-products";
import { TableRow, TableCell } from "6_shared/ui";
import { useCustomerCodeLoader, useCustomerNameLoader } from "../model";

interface ItemRowProps {
    item: Item;
    index: number;
    onChange: (index: number, field: keyof Item, value: string) => void;
    onRemove: (index: number) => void;
    errors?: ValidationErrors;
}

export const ItemRow = memo<ItemRowProps>(({
    item,
    index,
    onChange,
    onRemove,
    errors = {}
}) => {
    const handleRemove = useCallback(() => onRemove(index), [index, onRemove]);
    const loadCustomerCodes = useCustomerCodeLoader();
    const loadCustomerNames = useCustomerNameLoader();

    const handleInputChange = useCallback(
        (field: keyof Item) => (e: React.ChangeEvent<HTMLInputElement>) => {
            onChange(index, field, e.target.value);
        },
        [index, onChange]
    );

    const handleSelectChange = useCallback(
        (field: keyof Item) => (value: any) => {
            if (value && typeof value === 'object' && 'value' in value) {
                onChange(index, field, value.value);
            } else if (typeof value === 'string') {
                onChange(index, field, value);
            } else {
                onChange(index, field, '');
            }
        },
        [index, onChange]
    );

    // Специальный обработчик для кода клиента
    const handleCustomerCodeChange = useCallback(
        (value: any) => {
            const newCode = value && typeof value === 'object' && 'value' in value
                ? value.value
                : (typeof value === 'string' ? value : '');

            onChange(index, 'customerCode', newCode);

            // Сбрасываем имя клиента при изменении кода
            if (item.customerName) {
                onChange(index, 'customerName', '');
            }
        },
        [index, onChange, item.customerName]
    );

    const renderInput = (field: keyof Item, type: string = "text", step?: string) => (
        <Input
            type={type}
            step={step}
            showError={false}
            value={item[field] || ''}
            onChange={handleInputChange(field)}
            className="max-w-[90px] min-w-[60px]"
            placeholder={`Введите ${field}`}
            errors={errors[field]}
        />
    );

    const renderReadOnlyInput = (value: string, placeholder: string) => (
        <Input
            showError={false}
            className={`${INPUT_CLASSES} bg-gray-100 text-center max-w-[90px]`}
            value={value || '0'}
            readOnly
            placeholder={placeholder}
        />
    );

    const renderCustomerCodeSelect = () => {
        // Формируем правильное значение для селекта
        const selectedValue = item.customerCode
            ? { value: item.customerCode, label: item.customerCode }
            : null;

        return (
            <SelectAsync
                showError={false}
                key={`customer-code-${index}`} // Добавляем key для принудительного обновления
                value={selectedValue}
                onChange={handleCustomerCodeChange}
                loadOptions={loadCustomerCodes}
                errors={errors['customerCode']}
                placeholder="Выберите код клиента"
            />
        );
    };

    const renderCustomerNameSelect = () => {
        // Создаем функцию, которая будет делать запрос к серверу
        const loadCustomerNamesOptions = async (inputValue: string) => {
            if (!item.customerCode) return [];

            try {
                // Делаем запрос к серверу с учетом введенного текста
                const names = await loadCustomerNames(item.customerCode);

                return names;
            } catch (error) {
                console.error('Error loading customer names:', error);
                return [];
            }
        };

        // Формируем правильное значение для селекта имен
        const selectedNameValue = item.customerName
            ? { value: item.customerName, label: item.customerName }
            : null;


        return (
            <SelectAsync
                key={`customer-name-${index}-${item.customerCode || 'no-code'}`} // Обновляем при смене кода
                value={selectedNameValue}
                onChange={handleSelectChange('customerName')}
                loadOptions={loadCustomerNamesOptions}
                errors={errors['customerName']}
                placeholder={item.customerCode ? "Выберите имя клиента" : "Сначала выберите код"}
                isDisabled={!item.customerCode}
            />
        );
    };

    return (
        <TableRow>
            <TableCell className='!py-3 !px-4'>
                {index + 1}
            </TableCell>
            <TableCell className='!p-1'>
                {renderInput('name')}
            </TableCell>
            <TableCell className='!p-1'>
                {renderInput('length', 'number', '0.01')}
            </TableCell>
            <TableCell className='!p-1'>
                {renderInput('width', 'number', '0.01')}
            </TableCell>
            <TableCell className='!p-1'>
                {renderInput('height', 'number', '0.01')}
            </TableCell>
            <TableCell className='!p-1'>
                {renderInput('quantity', 'number')}
            </TableCell>
            <TableCell className='!p-1'>
                {renderInput('kgPerUnit', 'number', '0.01')}
            </TableCell>
            <TableCell className='!p-1'>
                {renderReadOnlyInput(item.totalVolume, "Автоматически")}
            </TableCell>
            <TableCell className='!p-1'>
                {renderReadOnlyInput(item.totalWeight, "Автоматически")}
            </TableCell>
            <TableCell className='!p-1'>
                {renderReadOnlyInput(item.ratio, "Автоматически")}
            </TableCell>
            <TableCell className='!p-1'>
                {renderCustomerCodeSelect()}
            </TableCell>
            <TableCell className='!p-1'>
                {renderCustomerNameSelect()}
            </TableCell>
            <TableCell className='!p-1'>
                <Button variant="danger" onClick={handleRemove}>
                    Удалить
                </Button>
            </TableCell>
        </TableRow>
    );
});

ItemRow.displayName = 'ItemRow';
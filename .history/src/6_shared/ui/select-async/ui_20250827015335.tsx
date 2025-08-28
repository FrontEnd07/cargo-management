"use client"

import React, { useCallback, useMemo } from "react"
import AsyncSelect from "react-select/async"
import type { AsyncSelectCurrencyProps, SelectOption } from "./types"
import type { MultiValue, SingleValue } from "react-select"
import { Loader2 } from 'lucide-react';
import { useDebouncedCallback } from "use-debounce";

export const SelectAsync = React.memo<AsyncSelectCurrencyProps>(({
    loadOptions,
    onChange,
    isMulti = false,
    value,
    label,
    errors,
    placeholder,
    id,
    isDisabled = false,
    showError
}) => {
    // Уменьшаем debounce до 300ms для лучшего UX
    const debouncedLoad = useDebouncedCallback(
        loadOptions,
        300,
        {
            leading: true,
            maxWait: 1000 // Максимальная задержка
        }
    );

    // Мемоизируем обработчик изменения
    const handleChange = useCallback((
        newValue: MultiValue<SelectOption> | SingleValue<SelectOption>,
    ) => {
        onChange?.(isMulti ? newValue as SelectOption[] : newValue as SelectOption | null)
    }, [onChange, isMulti]);

    // Мемоизируем стили
    const selectClassNames = useMemo(() => ({
        control: (state: any) => `
            whitespace-nowrap 
            dark:!bg-gray-800 
            ${errors ? '!border-red-300 dark:!border-red-500' : '!border-gray-300'} 
            !cursor-pointer 
            !appearance-none 
            !border 
            focus:!border-blue-500 
            !shadow-none 
            dark:!border-gray-600
        `,
        placeholder: () => `
            min-w-[80px] 
            dark:!text-gray-400 
            !text-gray-500
        `,
        menu: () => `
            z-33 
            rounded-xl 
            !ring-gray-950/5 
            !shadow-xl 
            dark:!bg-slate-900 
            dark:!border-gray-700 
            !border-gray-950/5 
            !border
        `,
        option: (state: any) => {
            if (state.isSelected) return 'dark:!bg-slate-300/30';
            if (state.isFocused) {
                return state.isSelected
                    ? 'dark:!bg-slate-300/30'
                    : 'bg-gray-50 dark:!bg-slate-300/10 !cursor-pointer'
            }
            return 'text-gray-900 dark:text-gray-300'
        },
        input: () => `dark:!text-white`,
        multiValue: () => `!bg-gray-100 dark:!bg-gray-700 !mr-1`,
        indicatorSeparator: () => `dark:!bg-gray-600`,
        singleValue: () => `min-w-[80px] dark:!text-gray-400`,
        multiValueLabel: () => `!text-gray-800 dark:!text-gray-200 !text-sm`,
        multiValueRemove: () => `
            dark:hover:!bg-gray-400 
            !text-gray-500 
            hover:!text-gray-700 
            dark:!text-gray-400 
            dark:hover:!text-gray-200 
            !cursor-pointer
        `,
        indicatorsContainer: () => `!p-0`
    }), [errors]);

    // Мемоизируем компоненты
    const components = useMemo(() => ({
        IndicatorSeparator: () => null,
        LoadingIndicator: () => null,
    }), []);

    return (
        <div>
            {label && (
                <label
                    htmlFor={id}
                    className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300"
                >
                    {label}
                </label>
            )}

            <div>
                <AsyncSelect
                    id={id}
                    isMulti={isMulti}
                    isDisabled={isDisabled}
                    defaultOptions
                    value={value}
                    placeholder={placeholder}
                    menuPortalTarget={isMulti ? undefined : document.body}

                    loadOptions={debouncedLoad}
                    onChange={handleChange}

                    classNames={selectClassNames}
                    components={components}

                    noOptionsMessage={() => "Нет данных..."}
                    loadingMessage={() => (
                        <div className="flex flex-col items-center justify-center">
                            <Loader2 className="w-5 h-5 animate-spin text-blue-500 mb-2" />
                            <span className="text-gray-500">Загрузка...</span>
                        </div>
                    )}
                />
            </div>

            {errors && showError && (
                <span className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors}
                </span>
            )}
        </div>
    )
});
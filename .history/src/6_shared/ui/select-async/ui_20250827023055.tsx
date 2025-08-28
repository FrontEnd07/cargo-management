"use client"

import React from "react"
import AsyncSelect from "react-select/async"
import type { AsyncSelectCurrencyProps, SelectOption } from "./types"
import type { MultiValue, SingleValue } from "react-select"
import { Loader2 } from 'lucide-react';
import { useDebouncedCallback } from "use-debounce";

export const SelectAsync = ({
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
}: AsyncSelectCurrencyProps) => {
    const debouncedLoad = useDebouncedCallback(
        (inputValue: string) => loadOptions(inputValue),
        1000,
        { leading: true }
    );

    const handleChange = (
        newValue: MultiValue<SelectOption> | SingleValue<SelectOption>,
    ) => {
        onChange?.(isMulti ? newValue as SelectOption[] : newValue as SelectOption | null)
    }

    // Стили компонента
    const getControlClass = (state: any) => `
        whitespace-nowrap 
        dark:!bg-gray-800 
        ${errors ? '!border-red-300 dark:!border-red-500' : '!border-gray-300'} 
        !cursor-pointer 
        !appearance-none 
        !border 
        focus:!border-blue-500 
        !shadow-none 
        dark:!border-gray-600
    `

    const getOptionClass = (state: any) => {
        if (state.isSelected) {
            return 'dark:!bg-slate-300/30'
        }
        if (state.isFocused) {
            return state.isSelected
                ? 'dark:!bg-slate-300/30'
                : 'bg-gray-50 dark:!bg-slate-300/10 !cursor-pointer'
        }
        return 'text-gray-900 dark:text-gray-300'
    }

    const selectClassNames = {
        control: getControlClass,
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
        option: getOptionClass,
        input: () => `dark:!text-white`,
        multiValue: () => `
            !bg-gray-100 
            dark:!bg-gray-700 
            !mr-1
        `,
        indicatorSeparator: () => `dark:!bg-gray-600`,
        singleValue: () => `
            min-w-[80px] 
            dark:!text-gray-400
        `,
        multiValueLabel: () => `
            !text-gray-800 
            dark:!text-gray-200 
            !text-sm
        `,
        multiValueRemove: () => `
            dark:hover:!bg-gray-400 
            !text-gray-500 
            hover:!text-gray-700 
            dark:!text-gray-400 
            dark:hover:!text-gray-200 
            !cursor-pointer
        `,
        indicatorsContainer: () => `
            !p-0
        `
    }

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
                    // Основные пропсы
                    id={id}
                    isMulti={isMulti}
                    isDisabled={isDisabled}
                    defaultOptions
                    value={value}
                    placeholder={placeholder}
                    menuPortalTarget={isMulti ? undefined : document.body}
                    
                    // Обработчики
                    loadOptions={debouncedLoad}
                    onChange={handleChange}

                    // Кастомизация
                    classNames={selectClassNames}
                    components={{
                        IndicatorSeparator: () => null,
                        LoadingIndicator: () => null,
                    }}

                    // Сообщения
                    noOptionsMessage={() => "Нет данных."}
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
}
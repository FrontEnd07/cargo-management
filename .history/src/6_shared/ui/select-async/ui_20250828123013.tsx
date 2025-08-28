"use client"

import React from "react"
import AsyncSelect from "react-select/async"
import type { AsyncSelectCurrencyProps, SelectOption } from "./types"
import type { MultiValue, SingleValue } from "react-select"
import { Loader2 } from 'lucide-react';
import { useDebouncedCallback } from "use-debounce";
import { classNames } from "6_shared/styles";

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

    const selectClassNames = classNames(errors ? true : false)

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
"use client";

import React, { FC } from "react";
import Flatpickr from "react-flatpickr";
import { Controller } from "react-hook-form";
import "flatpickr/dist/flatpickr.min.css";
import type { DateInputProps } from "./type";

export const DateInput: FC<DateInputProps> = ({
    name,
    control,
    label,
    options,
    placeholder,
    className,
    id,
    defaultValue,
    errors
}) => {
    return (
        <div className={className}>
            {label && <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">{label}</label>}
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                render={({ field, fieldState }) => (
                    <Flatpickr
                        {...field}
                        className={`
                        appearance-none relative block w-full px-3 py-2 border 
                        ${fieldState.error ? 'border-red-300 dark:border-red-500' : 'border-gray-300'}
                        placeholder-gray-500 text-gray-900 rounded-md focus:outline-none 
                        focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm transition-colors
                        dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                        dark:bg-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                        placeholder={placeholder}
                        options={{
                            ...options,
                            static: true,
                            defaultDate: defaultValue,
                        }}
                        value={field.value ?? ''}
                        onChange={(date) => field.onChange(date[0])}
                    />
                )}
            />
            {errors && (
                <div className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors}
                </div>
            )}
        </div>
    )
}
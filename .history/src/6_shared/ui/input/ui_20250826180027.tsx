import clsx from 'clsx';
import React, { forwardRef } from 'react';
import { InputProps } from './type';
import { X } from "lucide-react";

export const Input = forwardRef<HTMLInputElement, InputProps>(({ errors, type, value, label, id, className, onClear, showError = true, placeholder, ...props }, ref) => {
    return (
        <div>
            {label &&
                <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
                    {label}
                </label>
            }

            <div className='relative'>
                <input
                    id={id}
                    value={value}
                    name={id}
                    type={type}
                    ref={ref}
                    autoComplete="off"
                    className={`${clsx(className)} appearance-none relative block w-full px-3 py-2 border 
                ${errors ? 'border-red-300 dark:border-red-500' : 'border-gray-300'}
                placeholder-gray-500 text-gray-900 rounded-md focus:outline-none 
                focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm transition-colors
                dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                dark:bg-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    placeholder={placeholder}
                    {...props}
                />
                {onClear && value && value !== '' && (
                    <button
                        type="button"
                        className='cursor-pointer top-1/2 right-3 z-10 absolute transform -translate-y-1/2'
                        onClick={onClear}>
                        <X size={16} />
                    </button>
                )}
            </div>
            {errors && showError && (
                <span className="mt-1 text-sm text-red-600 dark:text-red-400">{errors}</span>
            )}
        </div>
    );
});

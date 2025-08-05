import clsx from 'clsx';
import React, { forwardRef } from 'react';
import { InputProps } from './type';

export const Input = ({ errors, type, label, id, className, placeholder, ...props }: InputProps) => {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
                {label}
            </label>
            <input
                id={id}
                name={id}
                type={type}
                autoComplete={id}
                className={`${clsx(className)} appearance-none relative block w-full px-3 py-2 border 
                ${errors ? 'border-red-300 dark:border-red-500' : 'border-gray-300'}
                placeholder-gray-500 text-gray-900 rounded-md focus:outline-none 
                focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm transition-colors
                dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                dark:bg-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                placeholder={placeholder}
                {...props}
            />
            {errors && (
                <span className="mt-1 text-sm text-red-600 dark:text-red-400">{errors}</span>
            )}
        </div>
    );
};

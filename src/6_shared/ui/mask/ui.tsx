"use client";

import React, { InputHTMLAttributes, useRef, forwardRef, useImperativeHandle, useEffect } from "react"
import IMask from "imask";
import { FieldError } from "react-hook-form";

interface MaskedInputProps extends InputHTMLAttributes<HTMLInputElement> {
    mask?: Parameters<typeof IMask>[1];
    errors?: FieldError | string;
    label?: string;
    className?: string;
    value?: string;
    placeholder?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Mask = forwardRef<HTMLInputElement, MaskedInputProps>(({ placeholder, mask, value, name, className, id, label, errors, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => inputRef.current!);

    useEffect(() => {
        if (inputRef.current && mask) {
            const maskInstance = IMask(inputRef.current, mask);

            // Проброс значения наружу при каждом вводе
            maskInstance.on('accept', () => {
                if (props.onChange) {
                    const e = {
                        target: {
                            name,
                            value: maskInstance.value
                        }
                    } as unknown as React.ChangeEvent<HTMLInputElement>;
                    props.onChange(e);
                }
            });

            return () => {
                maskInstance.destroy();
            };
        }
    }, [mask, props.onChange, name]);

    const errorMessage = typeof errors === 'string' ? errors : errors?.message;

    return <div className={className}>
        <label htmlFor={name} className={`block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300`}>
            {label}
        </label>
        <div className="relative">
            <input
                id={name}
                value={value ?? ""}
                ref={inputRef}
                placeholder={placeholder}
                {...props}
                className={`
                appearance-none relative block w-full px-3 py-2 border 
                ${errorMessage ? 'border-red-300 dark:border-red-500' : 'border-gray-300'}
                placeholder-gray-500 text-gray-900 rounded-md focus:outline-none 
                focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm transition-colors
                dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                dark:bg-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500`} />
        </div>
        {errorMessage && (<div className="mt-1 text-sm text-red-600 dark:text-red-400">{errorMessage}</div>)}
    </div >

})
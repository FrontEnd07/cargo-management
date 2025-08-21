"use client";

import { Controller, FieldValues } from "react-hook-form";
import { TagsInput } from "react-tag-input-component";
import type { TagInputProps } from "./types";
import styles from "./styles.module.scss"
import clsx from "clsx";

export const TagInput = <TFieldValues extends FieldValues>({
    name,
    control,
    label,
    errors,
    placeholder,
    className,
    ...rest
}: TagInputProps<TFieldValues>) => <div className={clsx(className, styles.main)}>
        {label && <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">{label}</label>}
        <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange } }) => (
                <TagsInput
                    classNames={{
                        input: '',
                        tag: `${styles.tag} !bg-green-100 !text-green-800 !px-2 !py-0.5 !rounded-md !text-sm`
                    }}
                    value={Array.isArray(value) ? value : []}
                    onChange={(tags: string[]) => onChange(tags)}
                    {...rest}
                />
            )}
        />
        {errors && <div className="mt-1 text-sm text-red-600 dark:text-red-400">{errors}</div>}
    </div>
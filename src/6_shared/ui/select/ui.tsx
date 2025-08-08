'use client';

import AsyncSelect from 'react-select/async';
import type { SearchSelectProps } from "./types"

export const Select = <OptionType,>({
    loadOptions,
    onChange,
    placeholder = 'Начните вводить...',
    noOptionsMessage = 'Ничего не найдено',
    loadingMessage = 'Загрузка...',
    className = '',
    isClearable = true,
    isSearchable = true,
}: SearchSelectProps<OptionType>) => {
    return (
        <div className={className}>
            <AsyncSelect<OptionType>
                loadOptions={loadOptions}
                onChange={onChange}
                placeholder={placeholder}
                noOptionsMessage={() => noOptionsMessage}
                loadingMessage={() => loadingMessage}
                isClearable={isClearable}
                isSearchable={isSearchable}
                classNamePrefix="react-select"
                styles={{
                    control: (provided) => ({
                        ...provided,
                        minHeight: '42px',
                        borderColor: '#d1d5db',
                        '&:hover': {
                            borderColor: '#9ca3af',
                        },
                    }),
                    menu: (provided) => ({
                        ...provided,
                        zIndex: 9999,
                    }),
                }}
            />
        </div>
    );
};
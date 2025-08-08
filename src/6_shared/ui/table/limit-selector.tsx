'use client';

import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

interface LimitSelectorProps {
    currentLimit: number;
    onLimitChange: (limit: number) => void;
    options?: number[];
}

export const LimitSelector = ({
    currentLimit,
    onLimitChange,
    options = [10, 25, 50, 100]
}: LimitSelectorProps) => {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger className='focus:outline-none hover:bg-gray-950/5 dark:hover:bg-slate-300/30 cursor-pointer border px-3 h-8 rounded-lg bg-white border-gray-300 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800'>
                Показывать по: {currentLimit}
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    className="dark:bg-slate-800 bg-white mt-1 py-2 dark:text-white rounded-xl shadow-xl dark:ring-white/10 ring ring-gray-950/5 min-w-[200px]"
                    sideOffset={5}
                >
                    {options.map((option) => (
                        <DropdownMenu.Item
                            onClick={() => onLimitChange(option)}
                            key={option}
                            className={`${option === currentLimit && "bg-gray-950/5 dark:bg-slate-300/30"} px-3 py-2 hover:bg-gray-950/5 focus:outline-none py-1 text-sm dark:hover:bg-slate-300/30 cursor-pointer`}>
                            {option}
                        </DropdownMenu.Item>
                    ))}
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
};
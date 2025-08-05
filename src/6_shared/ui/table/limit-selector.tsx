'use client';

import React from 'react';

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
        <div className="flex items-center space-x-2">
            <label htmlFor="limit-select" className="text-sm text-gray-700">
                Показывать по:
            </label>
            <select
                id="limit-select"
                value={currentLimit}
                onChange={(e) => onLimitChange(Number(e.target.value))}
                className="border border-gray-300 rounded-md text-sm px-3 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};
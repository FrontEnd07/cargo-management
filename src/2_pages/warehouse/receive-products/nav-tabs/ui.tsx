'use client';

import React, { Suspense } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { Loader2 } from "lucide-react";

// Ленивая загрузка компонентов для оптимизации
const CreateItems = React.lazy(() =>
    import("../create-items").then(module => ({ default: module.CreateItems }))
);

const ItemsProduct = React.lazy(() =>
    import("../items-product").then(module => ({ default: module.ItemsProduct }))
);

// Компонент загрузки
const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-blue-500 mb-2" />
        <span className="text-gray-500">Загрузка...</span>
    </div>
);

export const NavTabs = () => {
    return (
        <Tabs.Root defaultValue="tab1" className="w-full">
            <Tabs.List className="flex border-b border-slate-300 dark:border-gray-700 mb-6">
                <Tabs.Trigger
                    value="tab1"
                    className="py-2 text-sm cursor-pointer font-medium dark:text-gray-300 text-gray-700 hover:text-blue-400 hover:border-blue-400 border-b-1 border-transparent data-[state=active]:text-blue-400 data-[state=active]:border-blue-400"
                >
                    Прием грузов
                </Tabs.Trigger>
                <Tabs.Trigger
                    value="tab2"
                    className="px-4 py-2 text-sm font-medium dark:text-gray-300 text-gray-700 hover:text-blue-400 hover:border-blue-400 border-b-1 border-transparent data-[state=active]:text-blue-400 data-[state=active]:border-blue-400"
                >
                    Список грузов
                </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="tab1" className="mt-4">
                <CreateItems />
            </Tabs.Content>

            <Tabs.Content value="tab2" className="mt-4">
                <Suspense fallback={<LoadingSpinner />}>
                    <ItemsProduct />
                </Suspense>
            </Tabs.Content>
        </Tabs.Root>
    );
};
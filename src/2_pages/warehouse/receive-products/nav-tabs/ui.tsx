'use client';

import React, { Suspense } from 'react';
import * as Tabs from '@radix-ui/react-tabs';

// Ленивая загрузка компонентов для оптимизации
const CreateItems = React.lazy(() =>
    import("../create-items").then(module => ({ default: module.CreateItems }))
);

const ItemsProduct = React.lazy(() =>
    import("../items-product").then(module => ({ default: module.ItemsProduct }))
);

// Компонент загрузки
const LoadingSpinner = () => (
    <div className="flex items-center justify-center p-8">
        <div className="animate-pulse">
            <div className="h-64 bg-gray-200 rounded-xl"></div>
        </div>
    </div>
);

export const NavTabs = () => {
    return (
        <Tabs.Root defaultValue="tab1" className="w-full">
            <Tabs.List className="flex border-b border-gray-200 mb-6">
                <Tabs.Trigger
                    value="tab1"
                    className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent data-[state=active]:text-blue-600 data-[state=active]:border-blue-600"
                >
                    Создать товары
                </Tabs.Trigger>
                <Tabs.Trigger
                    value="tab2"
                    className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent data-[state=active]:text-blue-600 data-[state=active]:border-blue-600"
                >
                    Список товаров
                </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="tab1" className="mt-4">
                <Suspense fallback={<LoadingSpinner />}>
                    <CreateItems />
                </Suspense>
            </Tabs.Content>

            <Tabs.Content value="tab2" className="mt-4">
                <Suspense fallback={<LoadingSpinner />}>
                    <ItemsProduct />
                </Suspense>
            </Tabs.Content>
        </Tabs.Root>
    );
};
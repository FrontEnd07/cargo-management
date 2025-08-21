'use client';

import * as Tabs from '@radix-ui/react-tabs';
import { CreateItems } from "../create-items";
import { ItemsProduct } from "../items-product";

export const NavTabs = () => {
    return (
        <Tabs.Root defaultValue="tab1">
            <Tabs.List>
                <Tabs.Trigger value="tab1">
                    Вкладка 1
                </Tabs.Trigger>
                <Tabs.Trigger value="tab2">
                    Вкладка 2
                </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="tab1">
                <CreateItems />
            </Tabs.Content>
            <Tabs.Content value="tab2">
                <ItemsProduct />
            </Tabs.Content>
        </Tabs.Root>
    );
}
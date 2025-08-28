import { trpc } from "app/_trpcClient";
import type { SelectOption } from "6_shared/ui";
import { useCallback } from "react";

export const useCustomerCodeLoader = () => {
    const utils = trpc.useUtils();

    return async (inputValue: string): Promise<SelectOption[]> => {
        try {
            const data = await utils.Customer.getCustomerCodes.fetch(
                { search: inputValue },
            );
            console.log(data)
            return data?.map((el: any) => ({
                label: el.code,
                value: el.code,
            })) || [];
        } catch (error) {
            console.error("Error loading customer codes", error);
            return [];
        }
    };
};

export const useProductRoutesLoader = () => {
    const utils = trpc.useUtils();

    // ✅ Стабильная функция с useCallback
    const loadProductRoutes = useCallback(async (inputValue: string): Promise<SelectOption[]> => {
        try {
            const data = await utils.ProductRoutes.getProductRoutesAll.fetch({
                search: inputValue,
            });

            return data?.map((el: any) => ({
                label: el.name,
                value: el.name,
            })) || [];
        } catch (error) {
            console.error("Error loading product routes", error);
            return [];
        }
    }, [utils]); // ✅ Зависимость от utils

    return loadProductRoutes;
};

export const useCustomerNameLoader = () => {
    const utils = trpc.useUtils();

    return async (customerCode: string): Promise<SelectOption[]> => {
        if (!customerCode) return [];

        try {
            const data = await utils.Customer.getCustomerCodes.fetch({
                search: customerCode,
            });

            return data?.map((el: any) => ({
                label: el.customerName,
                value: el.customerName,
            })) || [];
        } catch (error) {
            console.error("Error loading customer names", error);
            return [];
        }
    };
};
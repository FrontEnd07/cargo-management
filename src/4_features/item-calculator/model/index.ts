import { trpc } from "app/_trpcClient";
import type { SelectOption } from "6_shared/ui";

export const useCustomerCodeLoader = () => {
    const utils = trpc.useUtils();

    return async (inputValue: string): Promise<SelectOption[]> => {
        try {
            const data = await utils.Customer.getCustomerCodes.fetch({
                search: inputValue,
            });

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
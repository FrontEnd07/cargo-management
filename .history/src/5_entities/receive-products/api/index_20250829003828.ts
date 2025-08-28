import type { SelectOption } from "6_shared/ui";
import { trpc } from "app/_trpcClient";

export const useCustomerCodeLoader = () => {
    const utils = trpc.useUtils();

    return async (inputValue: string): Promise<SelectOption[]> => {
        try {
            const data = await utils.Customer.getCustomerCodes.fetch(
                { search: inputValue },
                {
                    trpc: {
                        context: {
                            skipBatch: true
                        }
                    }
                }
            );
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

export const useWarehouses = () => {
    const utils = trpc.useUtils();

    return async (inputValue: string): Promise<SelectOption[]> => {
        try {
            const data = await utils.Warehouse.getWarehouse.fetch({
                search: inputValue,
            })

            return data?.map((el: any) => ({
                label: el.name,
                value: el.id
            })) || []
        } catch (error) {
            console.error('Error loading currencies:', error)
            return [];
        }
    }
}

export const useEmployee = () => {
    const utils = trpc.useUtils();

    return async (inputValue: string): Promise<SelectOption[]> => {
        try {
            const data = await utils.User.getUserAll.fetch({
                search: inputValue,
            })

            return data?.map((el: any) => ({
                label: el.name,
                value: el.id
            })) || []
        } catch (error) {
            console.error('Error loading currencies:', error)
            return [];
        }
    }
}
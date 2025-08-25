import { trpc } from "app/_trpcClient";
import type { SelectOption } from "6_shared/ui";


export const useCurrencyLoader = () => {
    const utils = trpc.useUtils()

    return async (inputValue: string): Promise<SelectOption[]> => {
        try {
            const data = await utils.Currency.getCurrency.fetch({
                search: inputValue,
            })

            return data?.map((el: any) => ({
                label: el.name,
                value: el.symbol,
            })) || []
        } catch (error) {
            console.error('Error loading currencies:', error)
            return []
        }
    }
}
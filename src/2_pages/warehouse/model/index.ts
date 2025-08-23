import { trpc } from "app/_trpcClient";
import type { SelectOption, GlobalTypeTable } from "6_shared/ui";
import { db } from "6_shared/api";

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

export const warehouse = {
    getAll: async (params: GlobalTypeTable) => {
        const {
            page = 1,
            limit = 10,
            search,
            sortBy,
            sortOrder
        } = params

        try {
            const whereConditions: any = {}

            if (search) {
                whereConditions.OR = [
                    { name: { contains: search } },
                    { phone: { contains: search } },
                    { address: { contains: search } }
                ]
            }

            const skip = (page - 1) * limit
            const take = limit

            const warehouses = await db.warehouse.findMany({
                where: whereConditions,
                skip,
                take,
                orderBy: sortBy ? { [sortBy]: sortOrder } : undefined
            })

            const total = await db.warehouse.count({
                where: whereConditions
            })

            return {
                data: warehouses,
                pagination: {
                    page: page || 1,
                    limit,
                    total,
                    totalPages: Math.ceil(total / limit)
                }
            }
        } catch (error) {
            console.error('Ошибка при получении валюты с пагинацией:', error);
            throw new Error('Не удалось загрузить список валют');
        }
    }
}
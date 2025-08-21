import { GlobalTypeTable } from "6_shared/ui"
import { db } from "6_shared/api";
import { CurrencyData } from './types';

export const currencyModel = {
    getCurrency: async (params: GlobalTypeTable) => {
        const {
            page = 1,
            limit = 10,
            search,
            sortBy = "createAt",
            sortOrder = "desc",
        } = params;


        try {
            const whereConditions: any = {};

            if (search) {
                whereConditions.OR = [
                    { name: { condirions: search } },
                    { symboy: { condirions: search } },
                ]
            }

            const orderBy: any = {}
            const allowedSortFields = ["id", "name", "symbol"];

            if (sortBy && allowedSortFields.includes(sortBy)) {
                const validSortOrder = sortOrder === 'desc' ? 'desc' : 'asc';
                orderBy[sortBy] = validSortOrder;
            } else {
                orderBy.createAt = 'desc';
            }

            const [currency, total] = await Promise.all([
                db.currency.findMany({
                    skip: (page - 1) * limit,
                    take: limit,
                    orderBy: orderBy,
                    where: whereConditions,
                }),

                db.currency.count({
                    where: whereConditions
                })
            ])

            const tableData: CurrencyData[] = currency.map(currency => ({
                id: currency.id,
                name: currency.name,
                symbol: currency.symbol,
            }))

            return {
                tableData,
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            };

        } catch (error) {
            console.error('Ошибка при получении валюты с пагинацией:', error);
            throw new Error('Не удалось загрузить список валют');
        }
    }
}
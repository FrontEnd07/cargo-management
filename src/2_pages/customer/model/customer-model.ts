import type { CustomerTableItem, GetCustomerParams } from "../type";
import { db } from "6_shared/api";

export const customerModel = {
    getWithpagination: async (params: GetCustomerParams) => {
        const {
            page = 1,
            limit = 10,
            search,
            sortBy = "createAt",
            sortOrder = "desc",
            filters,
            date
        } = params;

        try {
            const whereConditions: any = {};

            //Поиск по тексту
            if (search) {
                whereConditions.OR = [
                    { name: { contains: search } },
                    { phone: { contains: search } },
                    { address: { contains: search } },
                    {
                        codes: {
                            some: {
                                value: { contains: search }
                            }
                        }
                    }
                ]
            }

            // Фильтр по дате
            if (date) {
                const filterDate = new Date(date);
                // Начало и конец дня для точного поиска по дате
                const startOfDay = new Date(filterDate);
                startOfDay.setHours(0, 0, 0, 0);

                const endOfDay = new Date(filterDate);
                endOfDay.setHours(23, 59, 59, 999);

                whereConditions.date = {
                    gte: startOfDay,
                    lte: endOfDay
                };
            }

            //Фильтр по наличии кодов
            if (filters?.hasCodes !== undefined) {
                if (!filters.hasCodes) {
                    whereConditions.codes = {
                        none: {}
                    };
                } else {
                    whereConditions.codes = {
                        some: {}
                    };
                }
            }

            // Обработка сортировки - с проверкой допустимых полей
            const orderBy: any = {};

            // Разрешенные поля для сортировки
            const allowedSortFields = ['id', 'name', 'phone', 'address', 'date', 'createAt', 'updatedAt'];
            const relationSortFields = ['codes'];

            if (sortBy && allowedSortFields.includes(sortBy)) {
                // Обычная сортировка по полям клиента
                const validSortOrder = sortOrder === 'desc' ? 'desc' : 'asc';
                orderBy[sortBy] = validSortOrder;
            } else if (sortBy && relationSortFields.includes(sortBy)) {
                // Сортировка по отношениям
                if (sortBy === 'codes') {
                    // Сортировка по количеству кодов
                    orderBy.codes = {
                        _count: sortOrder === 'desc' ? 'desc' : 'asc'
                    };
                }
            } else {
                // Дефолтная сортировка
                orderBy.createAt = 'desc';
            }

            const [customers, total] = await Promise.all([
                db.customer.findMany({
                    skip: (page - 1) * limit,
                    take: limit,
                    orderBy: orderBy,
                    where: whereConditions,
                    include: {
                        codes: true
                    }
                }),

                db.customer.count({
                    where: whereConditions
                })
            ])

            const tableData: CustomerTableItem[] = customers.map(customer => ({
                id: customer.id,
                name: customer.name,
                phone: customer.phone,
                address: customer.address,
                codes: customer.codes.map(code => code.value),
                date: customer.date
            }))

            return {
                tableData,
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            };
        } catch (error) {
            console.error('Ошибка при получении клиентов с пагинацией:', error);
            throw new Error('Не удалось загрузить список клиентов');
        }
    }
}
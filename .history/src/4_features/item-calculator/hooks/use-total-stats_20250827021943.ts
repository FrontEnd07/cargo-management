import { useMemo } from "react";
import { Item } from "5_entities/receive-products";
import { calculateTotalStats } from "./calculations";

export const calculateTotalStats = (items: Item[]): TotalStats => {
    // Проверяем кеш
    if (totalStatsCache && totalStatsCache.items === items) {
        return totalStatsCache.result;
    }

    // Проверяем поверхностное равенство массива
    if (totalStatsCache && totalStatsCache.items.length === items.length) {
        const hasChanges = items.some((item, index) =>
            totalStatsCache!.items[index] !== item
        );

        if (!hasChanges) {
            return totalStatsCache.result;
        }
    }

    const totalVolume = items.reduce((sum, item) => sum + (parseFloat(item.totalVolume) || 0), 0);
    const totalWeight = items.reduce((sum, item) => sum + (parseFloat(item.totalWeight) || 0), 0);

    const result: TotalStats = {
        totalVolume: totalVolume.toFixed(4),
        totalWeight: totalWeight.toFixed(2),
        avgRatio: items.length > 0 ? (totalWeight / totalVolume || 0).toFixed(2) : '0.00'
    };

    // Обновляем кеш
    totalStatsCache = { items, result };

    return result;
};
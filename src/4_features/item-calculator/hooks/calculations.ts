// entities/item/lib/utils.ts

import { Item, TotalStats } from '5_entities/receive-products';

export const calculateItemValues = (item: Item): Item => {
    const length = parseFloat(item.length) || 0;
    const width = parseFloat(item.width) || 0;
    const height = parseFloat(item.height) || 0;
    const quantity = parseFloat(item.quantity) || 0;
    const kgPerUnit = parseFloat(item.kgPerUnit) || 0;

    // Расчет объема в м³ (переводим из см³ в м³)
    const volumePerUnit = (length * width * height) / 1000000; // см³ в м³
    const totalVolume = volumePerUnit * quantity;

    // Расчет общего веса
    const totalWeight = kgPerUnit * quantity;

    // Расчет соотношения (вес/объем)
    const ratio = totalVolume > 0 ? totalWeight / totalVolume : 0;

    return {
        ...item,
        totalVolume: totalVolume.toFixed(4),
        totalWeight: totalWeight.toFixed(2),
        ratio: ratio.toFixed(2)
    };
};

export const calculateTotalStats = (items: Item[]): TotalStats => {
    const totalVolume = items.reduce((sum, item) => sum + (parseFloat(item.totalVolume) || 0), 0);
    const totalWeight = items.reduce((sum, item) => sum + (parseFloat(item.totalWeight) || 0), 0);

    return {
        totalVolume: totalVolume.toFixed(4),
        totalWeight: totalWeight.toFixed(2),
        avgRatio: items.length > 0 ? (totalWeight / totalVolume || 0).toFixed(2) : '0.00'
    };
};

export const createNewItem = (id: string): Item => ({
    id,
    name: '',
    length: '',
    width: '',
    height: '',
    quantity: '',
    kgPerUnit: '',
    totalVolume: '',
    totalWeight: '',
    ratio: '',
    customerCode: '',
    customerName: '',
    productRoutes: '',
    shop: '',
    expense: '',
    currency: '',
    note: '',
});
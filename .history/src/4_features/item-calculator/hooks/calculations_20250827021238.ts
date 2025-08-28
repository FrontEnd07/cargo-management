import { Item, TotalStats } from '5_entities/receive-products';

// Кеш для результатов вычислений
const calculationCache = new Map<string, Pick<Item, 'totalVolume' | 'totalWeight' | 'ratio'>>();

// Вспомогательная функция для создания ключа кеша
const createCacheKey = (length: string, width: string, height: string, quantity: string, kgPerUnit: string): string => {
    return `${length}_${width}_${height}_${quantity}_${kgPerUnit}`;
};

// ❌ ПРОБЛЕМА: Эта функция выполняется при каждом изменении поля
// даже если изменилось поле, не влияющее на расчеты (например, customerName)
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

    // ❌ ПРОБЛЕМА: Создаем новый объект каждый раз, даже если значения не изменились
    return {
        ...item,
        totalVolume: totalVolume.toFixed(4),
        totalWeight: totalWeight.toFixed(2),
        ratio: ratio.toFixed(2)
    };
};
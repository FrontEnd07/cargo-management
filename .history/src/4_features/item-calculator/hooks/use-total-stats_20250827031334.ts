import { useMemo } from "react";
import { Item } from "5_entities/receive-products";
import { calculateTotalStats } from "./calculations";
import { useDebounce } from "6_shared/hooks";

export const useTotalStats = (items: Item[]) => {
    const debouncedItems = useDebounce(items, 300);
    return useMemo(() => calculateTotalStats(debouncedItems), [debouncedItems]);
};

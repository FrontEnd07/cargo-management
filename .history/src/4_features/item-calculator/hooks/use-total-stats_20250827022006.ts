import { useMemo } from "react";
import { Item } from "5_entities/receive-products";
import { calculateTotalStats } from "./calculations";

export const useTotalStats = (items: Item[]) => {
    return useMemo(() => calculateTotalStats(items), [items]);
};
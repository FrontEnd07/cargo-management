export interface Item {
    id: string;
    name: string;
    length: string;
    width: string;
    height: string;
    quantity: string;
    kgPerUnit: string;
    totalVolume: string;
    totalWeight: string;
    ratio: string;
    customerCode: string;
    customerName: string;
    productRoutes: string;
}

export interface ValidationErrors {
    [key: string]: string | undefined;
}

export interface TotalStats {
    totalVolume: string;
    totalWeight: string;
    avgRatio: string;
}
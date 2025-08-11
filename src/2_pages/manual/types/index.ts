export interface CurrencyProps {
    searchParams: Promise<{
        page?: string;
        limit?: string;
        search?: string;
        sortBy?: string;
        sortOrder?: "asc" | "desc"
    }>
}

export interface CurrencyModelProps {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc"
}

export interface CurrencyData {
    id: string;
    name: string;
    symbol: string;
}
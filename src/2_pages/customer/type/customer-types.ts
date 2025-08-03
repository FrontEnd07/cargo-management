import type { Customer, Codes } from "@prisma/client"

export type CustomerWithCodes = Customer & {
    codes: Codes[];
}

export type CustomerTableItem = {
    id: string;
    name: string;
    phone: string;
    address: string;
    codes: string[];
    date: Date;
}

export type GetCustomerParams = {
    page?: number;
    limit?: number;
    search?: string;
    sortBy: string;
    sortOrder?: 'asc' | 'desc';
    filters?: {
        dateFrom?: string;
        dateTo?: string;
        hasCodes?: boolean;
    }
}

export type CustomerParamsPageProps = {
    searchParams: {
        page?: string;
        limit?: string;
        search?: string;
        sortBy?: string;
        sortOrder?: string;
    }
}



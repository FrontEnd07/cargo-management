// Типы для общей информации
export interface GeneralInfo {
    employeeId: string;
    warehouseId: string;
    date: string;
    customerId?: string;
}

export interface GeneralInfoErrors {
    employeeId?: string;
    warehouseId?: string;
    date?: string;
    customerId?: string;
}
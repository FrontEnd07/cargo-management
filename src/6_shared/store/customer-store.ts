import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { StateCreator } from 'zustand';

interface CustomerState {
    // Одно состояние загрузки для всей таблицы
    isPending: boolean;

    // Ошибки
    error: string | null;

    // Действия
    setPending: (pending: boolean) => void;
    setError: (error: string | null) => void;
    clearState: () => void;
}

// Создаем StateCreator с явной типизацией
const customerStoreCreator: StateCreator<CustomerState> = (set) => ({
    // Начальное состояние
    isPending: false,
    error: null,

    // Простые сеттеры
    setPending: (pending: boolean) => set({ isPending: pending }),
    setError: (error: string | null) => set({ error }),
    clearState: () => set({ isPending: false, error: null })
});

// Экспортируем типизированный стор
export const useCustomerStore = create<CustomerState>()(
    devtools(customerStoreCreator, { name: 'customer-store' })
);

import type { ParsedUrlQuery } from 'node:querystring';
import type { NextRouter } from 'next/router';
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

// Тип для состояния
interface NavigationState {
    router: NextRouter | null;
    query: ParsedUrlQuery | undefined;
    asPath: string | undefined;
}

// Тип для экшенов
interface NavigationActions {
    setRouter: (router: NextRouter | null) => void;
    push: (url: string) => void;
    pushQuery: (query: ParsedUrlQuery | null) => void;
    reset: () => void;
}

// Создаем Zustand store
export const useNavigationStore = create<NavigationState & NavigationActions>()(
    subscribeWithSelector((set, get) => ({
        // Initial state
        router: null,
        query: undefined,
        asPath: undefined,

        // Actions
        setRouter: (router) => set({
            router,
            query: router?.query,
            asPath: router?.asPath
        }),

        push: (url) => {
            const { router } = get();
            router?.push(url);
        },

        pushQuery: (query) => {
            const { router } = get();
            if (router) {
                const { page, ...routerQuery } = router.query;
                router.push({ query: { ...routerQuery, ...query } });
            }
        },

        reset: () => set({
            router: null,
            query: undefined,
            asPath: undefined
        }),
    }))
);

// Хук для удобного использования в компонентах
export const useNavigation = () => {
    const { router, query, asPath, push, pushQuery } = useNavigationStore();

    return {
        router,
        query,
        asPath,
        push,
        pushQuery,
    };
};


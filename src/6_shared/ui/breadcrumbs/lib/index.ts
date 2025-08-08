import { paths } from '6_shared/routing';
import type { BreadcrumbItem, SidebarItem } from '../type';

// Рекурсивный поиск пути к элементу
const findSidebarPath = (
    items: SidebarItem[],
    targetUrl: string,
    trail: SidebarItem[] = []
): SidebarItem[] | null => {
    for (const item of items) {
        const newTrail = [...trail, item];

        if (item.url === targetUrl) return newTrail;

        if (item.items) {
            const nested = findSidebarPath(item.items, targetUrl, newTrail);
            if (nested) return nested;
        }
    }

    return null;
};

// Форматирование заголовка из части URL
const formatTitle = (slug: string): string => {
    const title = slug.replace(/[-_]/g, ' ');
    return title.charAt(0).toUpperCase() + title.slice(1);
};

// Генерация хлебных крошек по URL
export const generateBreadcrumbs = (pathname: string): BreadcrumbItem[] => {
    const breadcrumbs: BreadcrumbItem[] = [{ title: 'Главная', url: '/dashboard' }];

    if (pathname === '/' || pathname === '/dashboard') return breadcrumbs;

    const sidebarPath = findSidebarPath(paths.sidebar, pathname);

    if (sidebarPath) {
        const items = sidebarPath.filter(item => item.url !== '/dashboard');
        const menuCrumbs = items.map(item => ({
            title: item.title,
            url: item.url !== '#' ? item.url : undefined,
        }));

        return [...breadcrumbs, ...menuCrumbs];
    }

    // Если URL не найден в sidebar — построить на основе URL
    const parts = pathname.split('/').filter(Boolean);
    let url = '';

    const fallbackCrumbs = parts.map(part => {
        url += `/${part}`;
        return { title: formatTitle(part), url };
    });

    return [...breadcrumbs, ...fallbackCrumbs];
};

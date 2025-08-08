import {
    House,
    LucideIcon,
    Users,
    Warehouse,
    CirclePlus
} from "lucide-react"

export interface itemsSub {
    title: string
    url: string
}

export interface SubSidebarItem {
    title: string;
    url: string;
    items?: itemsSub[]
}

export interface SidebarItem {
    url: string | '#';
    title: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: SubSidebarItem[];
    roles?: string[];
}

export interface sidebarData {
    sidebar: SidebarItem[];
}

export const paths: sidebarData = {
    sidebar: [
        {
            title: 'Главная',
            icon: House,
            isActive: true,
            url: '/dashboard',
            roles: ["USER", "ADMIN", "MODERATOR"],
        },
        {
            title: 'Клиенты',
            icon: Users,
            isActive: true,
            url: '/customer',
            roles: ["USER", "ADMIN", "MODERATOR"],
        },
        {
            title: "Склад",
            url: '#',
            icon: Warehouse,
            isActive: true,
            roles: ["USER", "ADMIN", "MODERATOR"],
            items: [
                {
                    title: 'Получение грузов',
                    url: '/warehouse/receive-products'
                },
                {
                    title: 'Перемещение грузов',
                    url: '/warehouse/move-products'
                },
                {
                    title: 'Перегрузка грузов',
                    url: "/warehouse/control-invoices"
                },
                {
                    title: 'Прием грузов',
                    url: '/warehouse/reception-sent-products'
                },
                {
                    title: "Выдача грузов",
                    url: '/warehouse/give-products'
                },
                {
                    title: "Список складов",
                    url: "/warehouse/warehouses"
                }
            ]
        },
        {
            title: "Еще",
            url: "#",
            icon: CirclePlus,
            isActive: true,
            roles: ["USER", "ADMIN", "MODERATOR"],
            items: [
                {
                    title: "Справочники",
                    url: "#",
                    items: [
                        {
                            title: "Валюта",
                            url: "/manual/currency"
                        }
                    ]
                }
            ]
        }
    ]
}
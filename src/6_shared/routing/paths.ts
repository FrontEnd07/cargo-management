import {
    House,
    LucideIcon,
    Users,
} from "lucide-react"

export interface SubSidebarItem {
    title: string;
    url: string;
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
        }
    ]
}

export interface BreadcrumbItem {
    title: string;
    url?: string;
}

export interface SidebarItem {
    title: string;
    url?: string;
    icon?: React.ComponentType<{ className?: string }>;
    items?: SidebarItem[];
    roles?: string[];
    isActive?: boolean;
}
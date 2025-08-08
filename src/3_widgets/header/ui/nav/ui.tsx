'use client';

import { paths } from '6_shared/routing';
import { LinkButton } from "6_shared/ui";
import clsx from 'clsx';
import { useState } from "react";
import { usePathname } from 'next/navigation';
import { useDebounce } from 'use-debounce';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronRight } from 'lucide-react'; // Пример иконки

interface NavItem {
    title: string;
    url?: string;
    icon?: React.ComponentType<{ className?: string }>;
    items?: NavItem[];
}

// Объект со стилями стал более полным
const cn = {
    nav: 'lg:mb-0 cursor-pointer focus:outline-none mr-10 flex items-center justify-center text-lg hover:text-blue-400',
    item: 'focus:outline-none flex items-center w-full px-3 py-2 text-sm dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-300/30',
    dropdownContent: 'focus:outline-none min-w-[220px] bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-50',
    active: 'focus:outline-none text-blue-400',
    icon: 'size-4.5 mr-1.5',
    subIcon: 'size-4 mr-2'
};

// Хук остался без изменений, он хорош
const useHoverDropdown = () => {
    const [isOpen, setOpen] = useState(false);
    const [debouncedOpen] = useDebounce(isOpen, 50);
    return {
        isOpen: debouncedOpen,
        handleOpen: () => setOpen(true),
        handleClose: () => setOpen(false),
    };
};

// Основной компонент навигации
export const Nav = () => {
    const currentPath = usePathname();
    return (
        <div className='flex self-center lg:py-0 items-center'>
            {paths.sidebar.map((item, i) => (
                <NavigationItem key={i} item={item} currentPath={currentPath} />
            ))}
        </div>
    );
};

// --- Единый рекурсивный компонент для всех элементов навигации ---
const NavigationItem = ({ item, currentPath, isSubItem = false }: { item: NavItem; currentPath: string; isSubItem?: boolean }) => {
    const { isOpen, handleOpen, handleClose } = useHoverDropdown();
    const hasSubItems = !!item.items?.length;
    const isActive = !hasSubItems && currentPath === item.url; // Активным может быть только конечный элемент

    // Компонент для отображения иконки
    const ItemIcon = () => item.icon ? <item.icon className={isSubItem ? cn.subIcon : cn.icon} /> : null;

    // 1. Базовый случай: элемент без вложенных элементов (конечная ссылка)
    if (!hasSubItems) {
        const linkClasses = clsx(isSubItem ? cn.item : cn.nav, isActive && cn.active);
        const linkContent = (
            <>
                <ItemIcon />
                <span>{item.title}</span>
            </>
        );

        return isSubItem ? (
            <DropdownMenu.Item asChild>
                <LinkButton href={item.url || '#'} className={linkClasses}>{linkContent}</LinkButton>
            </DropdownMenu.Item>
        ) : (
            <LinkButton href={item.url || '#'} className={linkClasses}>{linkContent}</LinkButton>
        );
    }

    // 2. Рекурсивный случай: элемент с вложенным меню
    const DropdownWrapper = isSubItem ? DropdownMenu.Sub : DropdownMenu.Root;
    const Trigger = isSubItem ? DropdownMenu.SubTrigger : DropdownMenu.Trigger;
    const Content = isSubItem ? DropdownMenu.SubContent : DropdownMenu.Content;

    return (
        <div onMouseEnter={handleOpen} onMouseLeave={handleClose}>
            <DropdownWrapper open={isOpen} modal={false}>
                <Trigger asChild>
                    <button className={clsx(isSubItem ? cn.item : cn.nav, 'justify-between', isOpen && cn.active)}>
                        <div className="flex items-center">
                            <ItemIcon />
                            <span>{item.title}</span>
                        </div>
                        {isSubItem && <ChevronRight className="size-4" />}
                    </button>
                </Trigger>
                <DropdownMenu.Portal>
                    <Content className={cn.dropdownContent} sideOffset={isSubItem ? -5 : 5} alignOffset={isSubItem ? -5 : 0}>
                        {item.items?.map((subItem, i) => (
                            <NavigationItem key={i} item={subItem} currentPath={currentPath} isSubItem={true} />
                        ))}
                    </Content>
                </DropdownMenu.Portal>
            </DropdownWrapper>
        </div>
    );
};
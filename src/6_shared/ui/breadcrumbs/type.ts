
export type BreadcrumbItem = {
    text: string;
    href?: string;
}

export type BreadcrumbsProps = {
    items: BreadcrumbItem[];
    className?: string;
}
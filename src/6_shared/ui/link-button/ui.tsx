import clsx from "clsx";
import Link from "next/link";
import type { AnchorHTMLAttributes, PropsWithChildren } from "react";

interface LinkProps extends PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement>> {
    href: string;
}

export const LinkButton = ({ className, children, ...props }: LinkProps) => (
    <Link {...props} className={`hover:text-blue-400 duration-200 ${clsx(className)}`}>
        {children}
    </Link>
)
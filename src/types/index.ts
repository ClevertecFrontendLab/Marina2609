import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { Breadcrumb, Card } from 'antd';

export type LogoProps = {
    icon: ReactNode;
} & ComponentPropsWithoutRef<'div'>;

export type SidebarLinks = {
    label: string;
    key: string;
    icon: ReactNode;
};

export type SidebarToggleProps = {
    collapsed: boolean;
    toggleCollapsed: () => void;
    mobileVersion?: boolean;
};

export type BreadcrumbsType = ComponentPropsWithoutRef<typeof Breadcrumb>;

export type CardAction = {
    icon?: ReactNode;
    text: string;
};

export type CardActionData = {
    id?: string;
    title?: string;
    actions?: CardAction;
};

export type CardActivityProps = {
    id?: string;
    actions?: CardAction;
    title?: string;
};

export type CardsProps = ComponentPropsWithoutRef<typeof Card>;

export type CardProps = {
    icon?: ReactNode;
    title?: string;
} & ComponentPropsWithoutRef<'div'>;

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

export type TabsData = {
    label: string;
    key: string;
};

export type SubmitProps = {
    isEmailTouched: boolean;
    setIsEmailTouched: (value: boolean) => void;
    isSubmitDisabled: boolean;
};

export interface AuthForm {
    email: string;
    password: string;
    rememberMe?: boolean;
}

export interface RegistForm {
    email: string;
    password: string;
    confirmPassword?: string;
}

export interface RegistValues {
    email: string;
    password: string;
}

export interface Confirm {
    email: string;
    code: string;
}

export interface ChangePasswordValues {
    changePassword: string;
    changeConfirmPassword: string;
}

export interface PasswordData {
    password: string;
    confirmPassword: string;
}

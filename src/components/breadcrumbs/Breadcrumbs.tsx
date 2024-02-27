import { Breadcrumb } from 'antd';
import { BreadcrumbsType } from '../../types';
import classNames from 'classnames';
import './Breadcrumbs.css';

export const Breadcrumbs = ({ className, children, ...restProps }: BreadcrumbsType) => {
    const clName = classNames(className);

    return (
        <Breadcrumb className={clName} {...restProps}>
            {children}
        </Breadcrumb>
    );
};

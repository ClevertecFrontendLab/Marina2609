import { Breadcrumb } from 'antd';
import { BreadcrumbsType } from '../../../types';
import classNames from 'classnames';
import './breadcrumbs.css';

export const Breadcrumbs = ({ className, children, ...restProps }: BreadcrumbsType) => {
    const clName = classNames(className);

    return (
        <Breadcrumb className={clName} {...restProps}>
            {children}
        </Breadcrumb>
    );
};

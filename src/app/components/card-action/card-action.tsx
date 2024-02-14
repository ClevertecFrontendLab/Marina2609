import classNames from 'classnames';
import { CardProps } from '../../../types';

export const CardAction = (props: CardProps) => {
    const { icon, title, className, ...restProps } = props;

    const clName = classNames('card-action', className);

    return (
        <div className={clName} {...restProps}>
            {icon}
            <span>{title}</span>
        </div>
    );
};

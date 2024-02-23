import { Card } from 'antd';
import { CardsProps } from '../../../types';
import './card.css';

export const Cards = (props: CardsProps) => {
    const { children, ...restProps } = props;

    return <Card {...restProps}>{children}</Card>;
};

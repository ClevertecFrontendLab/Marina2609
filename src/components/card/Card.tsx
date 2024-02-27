import { Card } from 'antd';
import { CardsProps } from '../../types';
import './Card.css';

export const Cards = (props: CardsProps) => {
    const { children, ...restProps } = props;

    return <Card {...restProps}>{children}</Card>;
};

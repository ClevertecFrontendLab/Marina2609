import { Col } from 'antd';
import { CardAction } from '../card-action/CardAction';
import { Cards } from '..';
import { CardActivityProps } from '../../types';
import './CardActivity.css';

export const CardActivity = ({ title, actions }: CardActivityProps) => {
    return (
        <Col md={8} sm={24} xs={24} className='card-actions' span={8}>
            <Cards
                className='card-action'
                actions={[
                    <CardAction
                        className='card-activity'
                        icon={actions?.icon}
                        title={actions?.text}
                    />,
                ]}
            >
                {title}
            </Cards>
        </Col>
    );
};

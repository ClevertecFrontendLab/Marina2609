import { Button, Card, Layout } from 'antd';
import { AndroidFilled, AppleFilled } from '@ant-design/icons';
import { Cards } from '..';
import { CardAction } from '../card-action/CardAction';
import './Footer.css';

const { Footer } = Layout;

export const FooterContent = () => {
    const actionsElements = [
        <CardAction className='action-item' icon={<AndroidFilled />} title={'Android OS'} />,
        <CardAction className='action-item' icon={<AppleFilled />} title={'Apple iOS'} />,
    ];

    return (
        <Footer className='footer-container'>
            <Button className='footer__btn' type={'text'}>
                Смотреть отзывы
            </Button>
            <Cards
                bordered={false}
                bodyStyle={{ padding: '0 24px 10px' }}
                className='footer-card'
                actions={actionsElements}
            >
                <div className='meta'>
                    <Card.Meta
                        title={<span className='meta__title'>Скачать на телефон</span>}
                        description={<span>Доступно в PRO-тарифе</span>}
                    />
                </div>
            </Cards>
        </Footer>
    );
};

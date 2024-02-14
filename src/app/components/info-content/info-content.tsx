import { Card, Col, Row, Typography } from 'antd';
import { CardActionData } from '../../../types';
import { CardActivity } from '../card-activity/card-activity';
import { CalendarIcon, HeartIcon, ProfileIcon } from '../../../assets';
import './info-content.css';

const cardsActions: CardActionData[] = [
    {
        id: '1',
        title: 'Расписать тренировки',
        actions: {
            text: 'Тренировки',
            icon: <HeartIcon className='info__icon' style={{ color: '#2F54EBFF' }} />,
        },
    },
    {
        id: '2',
        title: 'Назначить календарь',
        actions: {
            text: 'Календарь',
            icon: <CalendarIcon className='info__icon' style={{ color: '#2F54EBFF' }} />,
        },
    },
    {
        id: '3',
        title: 'Заполнить профиль',
        actions: {
            text: 'Профиль',
            icon: <ProfileIcon className='info__icon' style={{ color: '#2F54EB' }} />,
        },
    },
];

export const InfoContent = () => {
    return (
        <div className='info-content'>
            <Row style={{ marginBottom: '24px', padding: '24px', background: '#fff' }}>
                <Col span={24}>
                    <Card className='card'>
                        <p>С CleverFit ты сможешь:</p>
                        <p>
                            — планировать свои тренировки на календаре, выбирая тип и уровень
                            нагрузки;
                        </p>
                        <p>
                            — отслеживать свои достижения в разделе статистики, сравнивая свои
                            результаты с нормами и рекордами;
                        </p>
                        <p>
                            — создавать свой профиль, где ты можешь загружать свои фото, видео и
                            отзывы о тренировках;
                        </p>
                        <p>
                            — выполнять расписанные тренировки для разных частей тела, следуя
                            подробным инструкциям и советам профессиональных тренеров.
                        </p>
                    </Card>
                </Col>
            </Row>
            <Row gutter={[16, 8]} style={{ marginBottom: '16px' }}>
                <Col span={24}>
                    <Card className='business-card'>
                        <Typography.Title level={4}>
                            CleverFit — это не просто приложение, а твой личный помощник в мире
                            фитнеса. Не откладывай на завтра — начни тренироваться уже сегодня!
                        </Typography.Title>
                    </Card>
                </Col>
            </Row>
            <Row className='cards-actions'>
                {cardsActions.map((card: CardActionData) => {
                    return (
                        <CardActivity
                            key={card.id}
                            title={card.title}
                            id={card.id}
                            actions={card.actions}
                        />
                    );
                })}
            </Row>
        </div>
    );
};

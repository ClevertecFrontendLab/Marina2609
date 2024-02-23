import { Card, Col, Row, Typography } from 'antd';
import { CardActionData } from '../../types';
import { CardActivity } from '../card-activity/CardActivity';
import { CardsActions } from '../../utils/CardsActions';
import './InfoContent.css';

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
                {CardsActions.map((card: CardActionData) => {
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

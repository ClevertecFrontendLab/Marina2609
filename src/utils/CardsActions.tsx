import { CalendarIcon, HeartIcon, ProfileIcon } from '../assets';
import { CardActionData } from '../types';

export const CardsActions: CardActionData[] = [
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

import { CalendarIcon, HeartIcon, ProfileIcon, TrophyIcon } from '../assets';
import { SidebarLinks } from '../types';

export const SidebarItems: SidebarLinks[] = [
    {
        label: 'Календарь',
        key: '1',
        icon: <CalendarIcon className='sidebar__icon' style={{ color: '#061178' }} />,
    },
    {
        label: 'Тренировки',
        key: '2',
        icon: <HeartIcon className='sidebar__icon' style={{ color: '#061178' }} />,
    },
    {
        label: 'Достижения',
        key: '3',
        icon: <TrophyIcon className='sidebar__icon' style={{ color: '#061178' }} />,
    },
    {
        label: 'Профиль',
        key: '4',
        icon: <ProfileIcon className='sidebar__icon' style={{ color: '#061178' }} />,
    },
];

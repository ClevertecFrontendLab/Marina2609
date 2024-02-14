import { Button, Layout, Menu } from 'antd';
import { CalendarIcon, HeartIcon, ProfileIcon, TrophyIcon } from '../../../assets';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { SidebarLinks } from '../../../types';
import { Logo, SidebarToggle } from '../../components';
import { LogoDesktopIcon, ExitIcon, LogoMinIcon } from '../../../assets';
import './sidebar.css';

const { Sider } = Layout;

export const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileVersion, setMobileVersion] = useState(false);

    const toggleCollapsed = () => {
        setCollapsed((prev) => !prev);
    };

    const sidebarItems: SidebarLinks[] = [
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

    const menuItems = sidebarItems.map((item) => (
        <Menu.Item
            key={item.key}
            className={classNames(
                collapsed
                    ? 'menu-item-collapsed'
                    : mobileVersion
                    ? 'menu-item-mobile'
                    : 'menu-item',
            )}
        >
            {(collapsed && item.icon) || (!collapsed && item.icon)}
            {!collapsed && item.label}
        </Menu.Item>
    ));

    useEffect(() => {
        const handleWindow = () => setMobileVersion(window.innerWidth <= 360);
        window.addEventListener('resize', handleWindow);

        return () => window.removeEventListener('resize', handleWindow);
    }, []);

    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            className={classNames(collapsed ? 'sider-collapsed' : 'sider')}
            collapsedWidth={mobileVersion ? 0 : '64px'}
            width={mobileVersion ? '106px' : '208px'}
        >
            <div>
                <Logo
                    className={classNames(collapsed ? 'logo-collapsed' : 'logo')}
                    icon={collapsed ? <LogoMinIcon /> : <LogoDesktopIcon />}
                />
                <Menu mode={'inline'} defaultSelectedKeys={['1']}>
                    {menuItems}
                </Menu>
            </div>
            <div className='logout'>
                {collapsed ? (
                    <Button type={'text'} className='logout__btn'>
                        <ExitIcon />
                    </Button>
                ) : (
                    <Button type={'text'} className='logout__btn'>
                        <ExitIcon /> <span className='exit'>Выход</span>
                    </Button>
                )}
            </div>
            <SidebarToggle
                collapsed={collapsed}
                mobileVersion={mobileVersion}
                toggleCollapsed={toggleCollapsed}
            />
        </Sider>
    );
};

import { Button, Layout, Menu } from 'antd';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Logo, SidebarToggle } from '..';
import { LogoDesktopIcon, ExitIcon, LogoMinIcon } from '../../assets';
import { SidebarItems } from '../../utils/SidebarItems';
import { useAppDispatch } from '../../hooks/TypedReactReduxHooks';
import { logout } from '../../store/reducers/AuthSlice';
import './Sidebar.css';

const { Sider } = Layout;

export const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileVersion, setMobileVersion] = useState(false);
    const dispatch = useAppDispatch();

    const toggleCollapsed = () => {
        setCollapsed((prev) => !prev);
    };

    const menuItems = SidebarItems.map((item) => (
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

    const handleLogout = () => {
        dispatch(logout());
    };

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
            <div
                className={classNames(
                    collapsed ? (mobileVersion ? 'logout-mobile' : 'logout') : 'logout',
                )}
            >
                {collapsed ? (
                    <Button type={'text'} className='logout__btn' onClick={handleLogout}>
                        <ExitIcon />
                    </Button>
                ) : (
                    <Button type={'text'} className='logout__btn' onClick={handleLogout}>
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

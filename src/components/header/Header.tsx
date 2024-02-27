import { Breadcrumb, Layout, Typography } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { Breadcrumbs } from '..';
import { Link } from 'react-router-dom';
import './Header.css';

const { Header } = Layout;

export const HeaderContent = () => {
    return (
        <Header className='header-container'>
            <Breadcrumbs className='breadcrumbs'>
                <Breadcrumb.Item>Главная</Breadcrumb.Item>
            </Breadcrumbs>
            <div className='header-container__wrapper'>
                <Typography.Title className='header-container__title'>
                    Приветствуем тебя в CleverFit — приложении, которое поможет тебе добиться своей
                    мечты!
                </Typography.Title>
                <Link to={''} className='settings__link'>
                    <SettingOutlined className='settings__icon' />
                    <span className='settings__title'>Настройки</span>
                </Link>
            </div>
        </Header>
    );
};

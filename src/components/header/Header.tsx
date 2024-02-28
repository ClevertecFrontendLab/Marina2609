import { Breadcrumb, Layout, Typography } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import { Breadcrumbs } from '..';
import './Header.css';

const { Header } = Layout;

export const HeaderContent = () => {
    const location = useLocation();
    const isMainPage = location.pathname.includes('/main');

    const breadCrambView = () => {
        const { pathname } = location;
        const pathnames = pathname.split('/').filter((item) => item);
        console.log(pathnames);

        return (
            <Header className='header-container'>
                <Breadcrumbs className='breadcrumbs'>
                    {pathnames[0] !== 'main' ? (
                        <Breadcrumb.Item>
                            <Link to='/' className='breadcrumb-main'>
                                Главная
                            </Link>
                        </Breadcrumb.Item>
                    ) : (
                        <Breadcrumb.Item>
                            <div className='route-active'>Главная</div>
                        </Breadcrumb.Item>
                    )}

                    {pathnames.map((name, index) => {
                        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                        const isLast = index === pathnames.length - 1;

                        const nameRoute =
                            name === 'main'
                                ? 'Главная'
                                : name === 'feedbacks'
                                ? 'Отзывы пользователей'
                                : '';

                        return isLast ? (
                            nameRoute !== 'Главная' && (
                                <Breadcrumb.Item className='route-active'>
                                    {nameRoute}
                                </Breadcrumb.Item>
                            )
                        ) : (
                            <Breadcrumb.Item>
                                <Link to={`${routeTo}`}>{nameRoute}</Link>
                            </Breadcrumb.Item>
                        );
                    })}
                </Breadcrumbs>

                {isMainPage && (
                    <div className='header-container__wrapper'>
                        <Typography.Title className='header-container__title'>
                            Приветствуем тебя в CleverFit — приложении, которое поможет тебе
                            добиться своей мечты!
                        </Typography.Title>
                        <Link to={''} className='settings__link'>
                            <SettingOutlined className='settings__icon' />
                            <span className='settings__title'>Настройки</span>
                        </Link>
                    </div>
                )}
            </Header>
        );
    };

    return breadCrambView();
};

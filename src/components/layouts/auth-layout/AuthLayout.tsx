import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Tabs } from 'antd';
import { TabsItems } from '../../../utils/Tabs';
import { Clever, Fit } from '../../../assets';
import './AuthLayout.css';
import { ChangePasswordPage, ConfirmEmailPage } from '../../../pages';
import { useState } from 'react';

export const AuthLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isConfirmEmailPage = location.pathname.includes('/confirm-email');
    const isPasswordPage = location.pathname.includes('/change-password');
    const [isAuth] = useState(localStorage.getItem('accessToken'));

    const tabChange = (key: string) => {
        navigate(`/auth${key === 'auth' ? '' : '/registration'}`);
    };

    return isAuth ? (
        <Navigate to='/main' />
    ) : (
        <div className='wrapper'>
            <div className='auth-page'>
                {isPasswordPage ? (
                    <ChangePasswordPage />
                ) : isConfirmEmailPage ? (
                    <ConfirmEmailPage />
                ) : (
                    <div className='auth-page__content'>
                        <div className='auth__logo'>
                            <Clever />
                            <Fit />
                        </div>
                        <Tabs
                            onChange={tabChange}
                            tabBarStyle={{ textAlign: 'center', color: '#262626FF' }}
                            className='tabs'
                            items={TabsItems}
                        />
                        <Outlet />
                    </div>
                )}
            </div>
        </div>
    );
};

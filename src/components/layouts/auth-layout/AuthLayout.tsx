import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Tabs } from 'antd';
import { TabsItems } from '../../../utils/Tabs';
import { Clever, Fit } from '../../../assets';
import './AuthLayout.css';
import { ConfirmEmailPage } from '../../../pages';

export const AuthLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isConfirmEmailPage = location.pathname.includes('/confirm-email');
    const isPasswordPage = location.pathname.includes('/change-password');

    // console.log(location.pathname);

    const tabChange = (key: string) => {
        navigate(`/auth${key === 'auth' ? '' : '/registration'}`);
    };

    return (
        <div className='wrapper'>
            <div className='auth-page'>
                {isPasswordPage ? (
                    // <ChangePasswordPage />
                    <div className=''></div>
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

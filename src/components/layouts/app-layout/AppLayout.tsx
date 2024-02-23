import { Layout } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { HeaderContent, Sidebar } from '../..';
import './AppLayout.css';
import { useEffect } from 'react';

export const AppLayout = () => {
    // const isAuth = false;
    // const navigator = useNavigate();

    // useEffect(() => {
    //     if (!isAuth) {
    //         navigator('/auth');
    //     } else navigator('/');
    // });

    return (
        <div className='wrapper'>
            <Layout className={'container'}>
                <Sidebar />
                <Layout className={'content-page'}>
                    <HeaderContent />
                    <Outlet />
                </Layout>
            </Layout>
        </div>
    );
};

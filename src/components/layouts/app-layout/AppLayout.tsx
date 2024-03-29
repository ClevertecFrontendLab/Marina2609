import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { HeaderContent, Sidebar } from '../..';
import './AppLayout.css';

export const AppLayout = () => {
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

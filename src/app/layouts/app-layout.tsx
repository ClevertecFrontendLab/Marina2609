import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { HeaderContent, Sidebar } from '../components';
import './layouts.css';

export const AppLayout: React.FC = () => {
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

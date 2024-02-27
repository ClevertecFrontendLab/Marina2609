import { Navigate } from 'react-router-dom';
import { InfoContent, FooterContent } from '../../components';
import { useAppSelector } from '../../hooks';
import { IsAuthenticated } from '../../store/reducers/AuthSlice';
import './MainPage.css';

export const MainPage: React.FC = () => {
    const isAuthenticated = useAppSelector(IsAuthenticated);

    return (
        <>
            {isAuthenticated ? (
                <div className='page-wrapper'>
                    <div className='main-page'>
                        <InfoContent />
                    </div>
                    <FooterContent />
                </div>
            ) : (
                <Navigate to={'/auth'} />
            )}
        </>
    );
};

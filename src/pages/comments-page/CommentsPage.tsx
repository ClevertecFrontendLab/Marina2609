import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { IsAuthenticated } from '../../store/reducers/AuthSlice';
import './CommentsPage.css';

export const CommentsPage: React.FC = () => {
    const isAuthenticated = useAppSelector(IsAuthenticated);

    return (
        <>
            {isAuthenticated ? (
                <>
                    <div className='comments-page'></div>
                </>
            ) : (
                <Navigate to={'/auth'} />
            )}
        </>
    );
};

import { Navigate } from 'react-router-dom';
import { useState } from 'react';

export const WelcomePage: React.FC = () => {
    const [isAuth] = useState(localStorage.getItem('accessToken'));

    return isAuth ? <Navigate to='/main' /> : <Navigate to='/auth' />;
};

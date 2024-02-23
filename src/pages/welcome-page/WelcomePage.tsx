import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { IsAuthenticated } from '../../store/reducers/AuthSlice';

export const WelcomePage: React.FC = () => {
    const isAuthenticated = useAppSelector(IsAuthenticated);

    return isAuthenticated ? <Navigate to='/main' /> : <Navigate to='/auth' />;
};

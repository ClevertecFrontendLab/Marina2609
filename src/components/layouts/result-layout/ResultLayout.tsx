import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { push } from 'redux-first-history';
import { useAppDispatch } from '../../../hooks';
import './ResultLayout.css';

export const ResultLayout = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const isAccess = !location.state || !location.state.fromServer;

        if (isAccess) {
            dispatch(push('/auth'));
        }
    }, [dispatch, location.state]);

    return (
        <section className='result-wrapper'>
            <Outlet />
        </section>
    );
};

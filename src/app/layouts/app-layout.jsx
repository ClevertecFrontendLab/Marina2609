import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import './layouts.css';

export const AppLayout = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/auth');
    }
  }, [token, navigate]);

  return (
    <div className='page__content'>
      <Outlet />
    </div>
  );
};

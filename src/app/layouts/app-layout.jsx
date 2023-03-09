import React from 'react';
import { Outlet } from 'react-router-dom';

import './layouts.css';

export const AppLayout = () => (
  <div className='page__content'>
    <Outlet />
  </div>
);

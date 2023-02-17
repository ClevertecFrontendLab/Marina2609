import React from 'react';
import { Outlet } from 'react-router-dom';

import { Aside } from '../components/aside/aside';

export const MainLayout = () => (
  <div className='main-wrapper'>
    <div className='aside-container'>
      <Aside />
    </div>
    <Outlet />
  </div>
);

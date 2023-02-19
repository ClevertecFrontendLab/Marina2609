import React from 'react';
import { Outlet } from 'react-router-dom';

import { Aside } from '../components/aside/aside';
import { Footer } from '../components/footer/footer';
import { Header } from '../components/header/header';

export const AppLayout = () => (
  <React.Fragment>
    <Header />
    <main>
      <div className='wrapper'>
        <div className='main-wrapper'>
          <div id='aside-container'>
            <Aside />
          </div>
          <Outlet />
        </div>
      </div>
    </main>
    <Footer />
  </React.Fragment>
);

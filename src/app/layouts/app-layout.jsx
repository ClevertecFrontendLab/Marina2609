import React from 'react';
import { Outlet } from 'react-router-dom';

import { Aside } from '../components/aside/aside';
import { Footer } from '../components/footer/footer';
import { Header } from '../components/header/header';

import './layouts.css';

export const AppLayout = () => (
  <React.Fragment>
    <Header />
    <main>
      <div className='wrapper'>
        <div className='wrapper-main'>
          <div className='aside__content'>
            <Aside />
          </div>
          <Outlet />
        </div>
      </div>
    </main>
    <Footer />
  </React.Fragment>
);

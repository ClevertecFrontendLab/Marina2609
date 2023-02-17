import React from 'react';
import { Outlet } from 'react-router-dom';

import { Footer } from '../components/footer/footer';
import { Header } from '../components/header/header';

export const BookLayout = () => (
  <React.Fragment>
    <Header />
    <main>
      <div className='book-wrapper'>
        <Outlet />
      </div>
    </main>
    <Footer />
  </React.Fragment>
);

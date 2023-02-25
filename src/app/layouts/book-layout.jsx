import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { getCategories } from '../../redux/actions/actions';
import { Footer } from '../components/footer/footer';
import { Header } from '../components/header/header';

import './layouts.css';

export const BookLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <React.Fragment>
      <Header />
      <main>
        <div className='wrapper-book'>
          <Outlet />
        </div>
      </main>
      <Footer />
    </React.Fragment>
  );
};

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { getCategories } from '../../redux/actions/actions';
import { Aside } from '../components/aside/aside';
import { Footer } from '../components/footer/footer';
import { Header } from '../components/header/header';

export const AppLayout = () => {
  const isLoadCategories = useSelector((state) => state.reducer.isLoadCategories);
  const categories = useSelector((state) => state.reducer.categories);
  const errorCategories = useSelector((state) => state.reducer.errorCategories);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <React.Fragment>
      <Header />
      <main>
        <div className='wrapper'>
          <div className='main-wrapper'>
            <div id='aside-container'>
              <Aside errorCategories={errorCategories} categories={categories} isLoadCategories={isLoadCategories} />
            </div>
            <Outlet />
          </div>
        </div>
      </main>
      <Footer />
    </React.Fragment>
  );
};

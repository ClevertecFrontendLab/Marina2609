import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Cards } from '../../app/components/cards/cards';
import { Filter } from '../../app/components/filter/filter';
import { Search } from '../../app/components/search/search';
import { getBooks, getCategories } from '../../redux/actions/actions';

import './main-page.css';

export const MainPage = () => {
  const [mainState, setMainState] = useState('grid');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooks());
    dispatch(getCategories());
  }, [dispatch]);

  const books = useSelector((state) => state.reducer.books);
  const loading = useSelector((state) => state.reducer.loading);
  const error = useSelector((state) => state.reducer.error);

  const toggle = (e) => {
    e.preventDefault();

    if (mainState === 'grid') {
      setMainState('list');
    } else setMainState('grid');
  };

  return (
    <article className='article'>
      <section className='main-page'>
        <div className='menu'>
          <div className='menu-container'>
            <Search />
            <Filter />
          </div>
          {mainState === 'grid' ? (
            <div className='main-btns'>
              <button
                type='button'
                className='btn-grid btn-grid-active'
                onClick={toggle}
                aria-label='grid'
                data-test-id='button-menu-view-window'
              />
              <button
                type='button'
                className='btn-list'
                onClick={toggle}
                aria-label='list'
                data-test-id='button-menu-view-list'
              />
            </div>
          ) : (
            <div className='main-btns'>
              <button
                type='button'
                className='btn-grid'
                onClick={toggle}
                aria-label='grid'
                data-test-id='button-menu-view-window'
              />
              <button
                type='button'
                className='btn-list btn-list-active'
                onClick={toggle}
                aria-label='list'
                data-test-id='button-menu-view-list'
              />
            </div>
          )}
        </div>
        {loading && (
          <div className='loader-container' data-test-id='loader'>
            <div className='loader' />
          </div>
        )}
        {books && <Cards books={books} state={mainState} />}
        {error && <div className='error' data-test-id='error' />}
      </section>
    </article>
  );
};

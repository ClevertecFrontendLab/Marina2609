/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Cards } from '../../app/components/cards/cards';
import { Filter } from '../../app/components/filter/filter';
import { Search } from '../../app/components/search/search';
import { getBooks, getCategories } from '../../redux/actions/actions';

import './main-page.css';

export const MainPage = (props) => {
  const [mainState, setMainState] = useState('grid');
  const books = useSelector((state) => state.reducer.books);
  const isLoading = useSelector((state) => state.reducer.isLoading);
  const error = useSelector((state) => state.reducer.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooks());
    dispatch(getCategories());
  }, [dispatch]);

  const toggle = (e) => {
    e.preventDefault();

    if (mainState === 'grid') {
      setMainState('list');
    } else setMainState('grid');
  };

  const closeError = () => {
    // dispatch(getError(false));
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
        {error ? (
          <div className='error-container' data-test-id='error'>
            <div className='error-content'>
              <div className='warning' />
              <h3 className='error-message'>Что-то пошло не так. Обновите страницу через некоторое время.</h3>
              <button type='button' className='close-message' onClick={closeError} />
            </div>
          </div>
        ) : isLoading ? (
          <div className='loader-container' data-test-id='loader'>
            <div className='loader' />
          </div>
        ) : (
          books && <Cards books={books} state={mainState} />
        )}
      </section>
    </article>
  );
};

/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Cards } from '../../app/components/cards/cards';
import { Filter } from '../../app/components/filter/filter';
import { Search } from '../../app/components/search/search';
import { getBooks, getCategories, getError } from '../../redux/actions/actions';

import './main-page.css';

export const MainPage = () => {
  const [mainState, setMainState] = useState('grid');
  const books = useSelector((state) => state.reducer.books);
  const isLoading = useSelector((state) => state.reducer.isLoading);
  const error = useSelector((state) => state.reducer.error);
  const isLoadCategories = useSelector((state) => state.reducer.isLoadCategories);
  const errorCategories = useSelector((state) => state.reducer.errorCategories);
  const isShow = useSelector((state) => state.reducer.isShow);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooks());
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    if (error || errorCategories) {
      dispatch(getError(true));
    }
  }, [dispatch, error, errorCategories]);

  const toggle = (e) => {
    e.preventDefault();

    if (mainState === 'grid') {
      setMainState('list');
    } else setMainState('grid');
  };

  const closeError = () => {
    dispatch(getError(false));
  };

  return (
    <article className='article'>
      <section className='main-page'>
        {isLoadCategories && isLoading ? (
          <div className='loader-container' data-test-id='loader'>
            <div className='loader' />
          </div>
        ) : isShow ? (
          <div className='error-container' data-test-id='error'>
            <div className='error-content'>
              <div className='warning' />
              <h3 className='error-message'>Что-то пошло не так. Обновите страницу через некоторое время.</h3>
              <button type='button' className='close-message' onClick={closeError} />
            </div>
          </div>
        ) : (
          books && (
            <React.Fragment>
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
              <Cards books={books} state={mainState} />
            </React.Fragment>
          )
        )}
      </section>
    </article>
  );
};

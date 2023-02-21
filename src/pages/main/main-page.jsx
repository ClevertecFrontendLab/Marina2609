/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Cards } from '../../app/components/cards/cards';
import { Filter } from '../../app/components/filter/filter';
import { Search } from '../../app/components/search/search';
import { getBooks, getCategories, getError, getSearch } from '../../redux/actions/actions';

import './main-page.css';

export const MainPage = () => {
  const [mainState, setMainState] = useState('grid');
  const books = useSelector((state) => state.reducer.books);
  const categories = useSelector((state) => state.reducer.categories);
  const isLoading = useSelector((state) => state.reducer.isLoading);
  const error = useSelector((state) => state.reducer.error);
  const isLoadCategories = useSelector((state) => state.reducer.isLoadCategories);
  const errorCategories = useSelector((state) => state.reducer.errorCategories);
  const isShow = useSelector((state) => state.reducer.isShow);
  const search = useSelector((state) => state.reducer.search);
  const sort = useSelector((state) => state.reducer.sort);
  const [filteredList, setFilteredList] = useState(books);
  const { category } = useParams();
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

  useEffect(() => {
    if (category === 'all') {
      setFilteredList(books);
    } else {
      let selectCategorie = [...categories];
      let categoryName = '';
      let updatedList = [...books];

      selectCategorie = selectCategorie.filter(
        (item) => item.path.toLowerCase().indexOf(category.toLowerCase()) !== -1
      );
      categoryName = selectCategorie[0].name;

      updatedList = updatedList.filter(
        (item) => item.categories[0].toLowerCase().indexOf(categoryName.toLowerCase()) !== -1
      );

      setFilteredList(updatedList);
    }
  }, [books, categories, category]);

  useEffect(() => {
    dispatch(getSearch(filteredList));
  }, [filteredList, dispatch]);

  const toggle = (e) => {
    e.preventDefault();

    if (mainState === 'grid') {
      setMainState('list');
    } else setMainState('grid');
  };

  const closeError = () => {
    dispatch(getError(false));
  };

  // console.log(sort);

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
                  <Search books={books} />
                  <Filter books={books} />
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

              <Cards books={search ? search : sort ? sort : books} state={mainState} />
            </React.Fragment>
          )
        )}
      </section>
    </article>
  );
};

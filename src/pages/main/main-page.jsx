import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Cards } from '../../app/components/cards/cards';
import { Filter } from '../../app/components/filter/filter';
import { Loader } from '../../app/components/loader/loader';
import { ErrorMessage } from '../../app/components/messages/error-message/error-message';
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
  const [filteredList, setFilteredList] = useState(books);
  const [data, setData] = useState(books);

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
    setData(
      books.sort((a, b) => {
        if (a.rating < b.rating) {
          return 1;
        }
        if (a.rating > b.rating) {
          return -1;
        }

        return 0;
      })
    );
  }, [books]);

  useEffect(() => {
    if (category === 'all' || !category) {
      setFilteredList(data);
    } else {
      let selectCategorie = categories;
      let categoryName = '';
      let updatedList = data;

      selectCategorie = selectCategorie.filter(
        (item) => item.path.toLowerCase().indexOf(category.toLowerCase()) !== -1
      );

      selectCategorie.map((elem) => {
        categoryName = elem.name;

        return categoryName;
      });

      updatedList = updatedList.filter((item) => item.categories.indexOf(categoryName) !== -1);

      setFilteredList(updatedList);
    }
  }, [data, categories, category]);

  useEffect(() => {
    dispatch(getSearch(filteredList));
  }, [filteredList, dispatch]);

  const toggle = (e) => {
    e.preventDefault();

    if (mainState === 'grid') {
      setMainState('list');
    } else setMainState('grid');
  };

  return (
    <article className='article'>
      <section className='main-page'>
        {isLoadCategories && isLoading ? (
          <Loader />
        ) : isShow ? (
          <ErrorMessage />
        ) : (
          data && (
            <React.Fragment>
              <div className='menu'>
                <div className='menu-container'>
                  <Search books={data} />
                  <Filter books={data} />
                </div>
                <div className='main-btns'>
                  <button
                    type='button'
                    className={mainState === 'grid' ? 'btn-grid btn-grid-active' : 'btn-grid'}
                    onClick={toggle}
                    aria-label='grid'
                    data-test-id='button-menu-view-window'
                  />
                  <button
                    type='button'
                    className={mainState === 'grid' ? 'btn-list' : 'btn-list btn-list-active'}
                    onClick={toggle}
                    aria-label='list'
                    data-test-id='button-menu-view-list'
                  />
                </div>
              </div>
              <Cards books={search ? search : data} state={mainState} category={category} />
            </React.Fragment>
          )
        )}
      </section>
    </article>
  );
};

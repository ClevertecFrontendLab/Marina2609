import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { getSearch, getSearchValue } from '../../../store/actions/actions';

import './search.css';

export const Search = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [filteredList, setFilteredList] = useState();
  const books = useSelector((state) => state.reducer.books);
  const dispatch = useDispatch();

  const toggleSearchOpen = () => {
    setIsVisible(true);
  };

  const toggleSearchClose = () => {
    setIsVisible(false);
    setIsFocused(false);
  };

  const filterBySearch = (event) => {
    const query = event.target.value;

    let updatedList = [...props.books];

    updatedList = updatedList.filter((item) => item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1);

    setFilteredList(updatedList);
    dispatch(getSearchValue(query));
  };

  useEffect(() => {
    dispatch(getSearch(filteredList));
  }, [dispatch, filteredList]);

  useEffect(() => {
    setIsFocused(true);

    if (!filteredList) {
      setIsFocused(false);
    } else if (filteredList.length === books.length) {
      setIsFocused(false);
    } else {
      setIsFocused(true);
    }
  }, [books, filteredList]);

  return (
    <div className={classNames('search', { search__hide: isVisible })}>
      <div
        className={classNames(isFocused ? 'search__icon search__icon_active' : 'search__icon', {
          search__icon_hide: isVisible,
        })}
        aria-hidden={true}
        data-test-id='button-search-open'
        onClick={toggleSearchOpen}
      />

      <input
        type='text'
        className={isVisible ? 'search__input_visible' : 'search__input'}
        placeholder='Поиск книги или автора…'
        onChange={filterBySearch}
        data-test-id='input-search'
        onClick={toggleSearchOpen}
        onFocus={() => setIsFocused(true)}
      />
      <div
        className={isVisible ? classNames('search__close', { '': isVisible }) : ''}
        aria-hidden={true}
        data-test-id='button-search-close'
        onClick={toggleSearchClose}
      />
    </div>
  );
};

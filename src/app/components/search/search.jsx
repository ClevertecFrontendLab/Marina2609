import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';

import { getSearch, getSearchValue } from '../../../redux/actions/actions';

import './search.css';

export const Search = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [filteredList, setFilteredList] = useState();
  const dispatch = useDispatch();

  const toggleSearchOpen = () => {
    setIsVisible(true);
  };

  const toggleSearchClose = () => {
    setIsVisible(false);
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

  return (
    <div className={classNames('search', { search__hide: isVisible })}>
      <div
        className={classNames('search__icon', { search__icon_hide: isVisible })}
        aria-hidden={true}
        data-test-id='button-search-open'
        onClick={toggleSearchOpen}
      />

      <input
        type='text'
        className={isVisible ? 'search__input_visible' : 'search__input'}
        placeholder='Поиск книги или автора…'
        onChange={filterBySearch}
        onClick={toggleSearchOpen}
        data-test-id='input-search'
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

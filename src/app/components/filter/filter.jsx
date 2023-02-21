import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { getSearch } from '../../../redux/actions/actions';

import './filter.css';

export const Filter = (props) => {
  const [sortedList, setSortedList] = useState('');
  const [isToggle, setIsToggle] = useState(false);
  const dispatch = useDispatch();

  const toggleSort = () => {
    let updatedList = [...props.books];

    if (isToggle === true) {
      updatedList = updatedList.sort((a, b) => {
        if (a.rating < b.rating) {
          return 1;
        }
        if (a.rating > b.rating) {
          return -1;
        }

        return 0;
      });
    } else {
      updatedList = updatedList.sort((a, b) => {
        if (a.rating > b.rating) {
          return 1;
        }
        if (a.rating < b.rating) {
          return -1;
        }

        return 0;
      });
    }
    setIsToggle(!isToggle);
    setSortedList(updatedList);
  };

  useEffect(() => {
    dispatch(getSearch(sortedList));
  }, [dispatch, sortedList]);

  return (
    <div className='filter-container'>
      <div className='filter-icon' />
      <input
        data-test-id='sort-rating-button'
        type='filter'
        className='filter'
        placeholder='По рейтингу'
        onClick={toggleSort}
      />
    </div>
  );
};

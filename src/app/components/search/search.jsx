import React, { useState } from 'react';
import classNames from 'classnames';

import './search.css';

export const Search = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleSearchOpen = () => {
    setIsVisible(true);
  };

  const toggleSearchClose = () => {
    setIsVisible(false);
  };

  return (
    <div className={classNames('search-container', { 'hide-search': isVisible })}>
      {!isVisible && (
        <div className='search-icon' aria-hidden={true} data-test-id='button-search-open' onClick={toggleSearchOpen} />
      )}

      <input
        data-test-id='input-search'
        type='text'
        className={isVisible ? 'visible-search' : 'search'}
        placeholder='Поиск книги или автора…'
      />
      <div
        className={isVisible ? classNames('close-icon', { '': isVisible }) : ''}
        aria-hidden={true}
        data-test-id='button-search-close'
        onClick={toggleSearchClose}
      />
    </div>
  );
};

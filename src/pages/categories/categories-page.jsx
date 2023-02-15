import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Cards } from '../../app/components/cards/cards';
import { Filter } from '../../app/components/filter/filter';
import { Search } from '../../app/components/search/search';

import './categories-page.css';

export const CategoriesPage = () => {
  const [state, setState] = useState('grid');
  const location = useLocation();
  const { props } = location.state;

  const toggle = (e) => {
    e.preventDefault();

    if (state === 'grid') {
      setState('list');
    } else setState('grid');
  };

  useEffect(() => {
    const menu = document.getElementById('aside-container');

    menu.style.display = 'block';
    document.querySelector('.article').parentNode.classList.remove('wrapper-book');
  });

  return (
    <article className='article'>
      <section className='categories-page'>
        <div className='menu'>
          <div className='menu-container'>
            <Search />
            <Filter />
          </div>
          {state === 'grid' ? (
            <div className='main-btns'>
              <button type='button' className='btn-grid btn-grid-active' onClick={toggle} aria-label='grid' />
              <button type='button' className='btn-list' onClick={toggle} aria-label='list' />
            </div>
          ) : (
            <div className='main-btns'>
              <button type='button' className='btn-grid' onClick={toggle} aria-label='grid' />
              <button type='button' className='btn-list btn-list-active' onClick={toggle} aria-label='list' />
            </div>
          )}
        </div>
        <Cards cards={props} state={state} />
      </section>
    </article>
    // </div>
  );
};

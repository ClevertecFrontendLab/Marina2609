import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import './aside.css';

export const Aside = (props) => {
  const [arrow, setArrow] = useState('arrow-up');
  const [isGenresOpen, setIsGenresOpen] = useState(false);
  const [isActiveLink, setIsActiveLink] = useState(true);
  const isLoadCategories = useSelector((state) => state.reducer.isLoadCategories);
  const categories = useSelector((state) => state.reducer.categories);
  const errorCategories = useSelector((state) => state.reducer.errorCategories);

  const toggleArrow = () => {
    if (arrow === 'arrow-down') {
      setArrow('arrow-up');
    } else {
      setArrow('arrow-down');
    }

    setIsGenresOpen(!isGenresOpen);
  };

  console.log(categories);

  return (
    <aside data-test-id='burger-navigation'>
      <nav className='aside-nav'>
        <h2>
          <div
            aria-hidden={true}
            className={classNames('genres  link-active', { '': !isGenresOpen })}
            onClick={toggleArrow}
            data-test-id={props.isBurger ? 'burger-showcase' : 'navigation-showcase'}
          >
            Витрина книг
            <div className={`arrow ${arrow}`} />
          </div>
        </h2>

        <ul className={classNames('aside-list-books', { none: isGenresOpen })}>
          <ul>
            <li className=' all-books aside-item'>
              <NavLink
                data-test-id={props.isBurger ? 'burger-books' : 'navigation-books'}
                to='/books/all'
                className={classNames('aside-item', { 'all-books': isGenresOpen })}
                // className={isGenresOpen ? 'navItem' : 'navItemActive'}
                aria-hidden={false}
                // onClick={toggleArrow}
              >
                Все книги
              </NavLink>
            </li>

            {categories.map((categorie) => (
              <li className='aside-item'>
                <NavLink
                  aria-hidden={false}
                  to={`/category/${categorie.path}`}
                  // state={{
                  //   props: data.filter((e) => e.category.includes('Бизнес-книги')),
                  // }}
                  // onClick={toggleArrow}
                >
                  {categorie.name} <span className='count'>{categorie.id} </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </ul>

        <ul className='aside-list'>
          <h2>
            <NavLink
              data-test-id={props.isBurger ? 'burger-terms' : 'navigation-terms'}
              to='/rule'
              className={({ isActive }) => (isActive ? ' link-active' : '')}
              onClick={() => {
                setIsActiveLink(false);
                toggleArrow();
              }}
            >
              Правила пользования
            </NavLink>
          </h2>
        </ul>
        <ul className='aside-list'>
          <h2>
            <NavLink
              data-test-id={props.isBurger ? 'burger-contract' : 'navigation-contract'}
              to='/document'
              className={({ isActive }) => (isActive ? ' link-active' : '')}
              onClick={() => {
                setIsActiveLink(false);
                toggleArrow();
              }}
            >
              Договор оферты
            </NavLink>
          </h2>
        </ul>
      </nav>
    </aside>
  );
};

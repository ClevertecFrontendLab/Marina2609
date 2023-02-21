import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import './aside.css';

export const Aside = (props) => {
  const [arrow, setArrow] = useState('arrow-up');
  const [isGenresOpen, setIsGenresOpen] = useState(false);
  const categories = useSelector((state) => state.reducer.categories);
  const isLoadCategories = useSelector((state) => state.reducer.isLoadCategories);
  const books = useSelector((state) => state.reducer.books);

  const toggleArrow = () => {
    if (arrow === 'arrow-down') {
      setArrow('arrow-up');
    } else {
      setArrow('arrow-down');
    }

    setIsGenresOpen(!isGenresOpen);
  };

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
            {!isLoadCategories && categories && (
              <React.Fragment>
                <li className=' all-books aside-item'>
                  <NavLink
                    data-test-id={props.isBurger ? 'burger-books' : 'navigation-books'}
                    to='/books/all'
                    className={classNames('aside-item', { 'all-books': isGenresOpen })}
                    aria-hidden={false}
                  >
                    Все книги
                  </NavLink>
                </li>

                {categories.map((categorie) => (
                  <li className='aside-item' key={categorie.id}>
                    <NavLink
                      aria-hidden={false}
                      to={`books/${categorie.path}`}
                      state={{
                        props: books,
                      }}
                      onClick={toggleArrow}
                      data-test-id={props.isBurger ? `burger-${categorie.path}` : `navigation-${categorie.path}`}
                    >
                      {categorie.name}{' '}
                      <span
                        className='count'
                        data-test-id={
                          props.isBurger
                            ? `burger-book-count-for-${categorie.path}`
                            : `navigation-book-count-for-${categorie.path}`
                        }
                      >
                        {categorie.id}{' '}
                      </span>
                    </NavLink>
                  </li>
                ))}
              </React.Fragment>
            )}
          </ul>
        </ul>

        <ul className='aside-list'>
          <h2>
            <NavLink
              data-test-id={props.isBurger ? 'burger-terms' : 'navigation-terms'}
              to='/rule'
              className={({ isActive }) => (isActive ? ' link-active' : '')}
              onClick={toggleArrow}
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
              onClick={toggleArrow}
            >
              Договор оферты
            </NavLink>
          </h2>
        </ul>
      </nav>
    </aside>
  );
};

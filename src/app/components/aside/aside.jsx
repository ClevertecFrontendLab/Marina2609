import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import { getFilter } from '../../../redux/actions/actions';

import './aside.css';

export const Aside = (props) => {
  const [arrow, setArrow] = useState('arrow-up');
  const [isGenresOpen, setIsGenresOpen] = useState(false);
  const [isMenuBooks, setIsMenuBooks] = useState(true);
  const categories = useSelector((state) => state.reducer.categories);
  const isLoadCategories = useSelector((state) => state.reducer.isLoadCategories);
  const books = useSelector((state) => state.reducer.books);
  const [count, setCount] = useState('');
  const dispatch = useDispatch();

  const toggleArrow = () => {
    if (arrow === 'arrow-down') {
      setArrow('arrow-up');
    } else {
      setArrow('arrow-down');
    }

    setIsGenresOpen(!isGenresOpen);
  };

  useEffect(() => {
    const array = [];
    const arrayCount = [];

    categories.map((category) => array.push(books.filter((item) => item.categories.indexOf(category.name) !== -1)));

    array.map((elem) => arrayCount.push(elem.length));
    setCount(arrayCount);
  }, [books, categories]);

  return (
    <aside data-test-id='burger-navigation'>
      <nav className='nav'>
        <h2>
          <NavLink
            to='books/all'
            className={classNames(isMenuBooks ? 'nav__genres nav__link-active' : 'nav__genres', {
              '': !isGenresOpen,
            })}
            onClick={toggleArrow}
            data-test-id={props.isBurger ? 'burger-showcase' : 'navigation-showcase'}
          >
            Витрина книг
            <div className={`arrow ${arrow}`} />
          </NavLink>
        </h2>
        <ul className={classNames('nav__list-books', { nav__none: isGenresOpen })}>
          <ul>
            {!isLoadCategories && categories && (
              <React.Fragment>
                <li className='nav__all-books nav__item'>
                  <NavLink
                    data-test-id={props.isBurger ? 'burger-books' : 'navigation-books'}
                    to={props.isBurger ? '/books/all' : 'books/all'}
                    className={classNames('nav__item', { 'nav__all-books': isGenresOpen })}
                    aria-hidden={false}
                    onClick={() => (props.isBurger ? toggleArrow() : '')}
                  >
                    Все книги
                  </NavLink>
                </li>

                {categories.map((category, index) => (
                  <li className='nav__item' key={category.id}>
                    <NavLink
                      className='nav__link'
                      aria-hidden={false}
                      to={props.isBurger ? `/books/${category.path}` : `books/${category.path}`}
                      state={{
                        props: books,
                      }}
                      onClick={() =>
                        count[index] === 0
                          ? dispatch(getFilter(true)) && (props.isBurger ? toggleArrow() : '')
                          : dispatch(getFilter(false)) && (props.isBurger ? toggleArrow() : '') && setIsMenuBooks(true)
                      }
                      // onClick={toggleArrow}
                    >
                      <div data-test-id={props.isBurger ? `burger-${category.path}` : `navigation-${category.path}`}>
                        {category.name}
                      </div>

                      <span
                        className='nav__count'
                        data-test-id={
                          props.isBurger
                            ? `burger-book-count-for-${category.path}`
                            : `navigation-book-count-for-${category.path}`
                        }
                      >
                        {count[index]}
                      </span>
                    </NavLink>
                  </li>
                ))}
              </React.Fragment>
            )}
          </ul>
        </ul>

        <ul className='nav__list'>
          <h2>
            <NavLink
              data-test-id={props.isBurger ? 'burger-terms' : 'navigation-terms'}
              to='/rule'
              className={({ isActive }) => (isActive ? ' nav__link-active' : '')}
              onClick={() => {
                toggleArrow();
                setIsMenuBooks(false);
              }}
            >
              Правила пользования
            </NavLink>
          </h2>
        </ul>
        <ul className='nav__list'>
          <h2>
            <NavLink
              data-test-id={props.isBurger ? 'burger-contract' : 'navigation-contract'}
              to='/document'
              className={({ isActive }) => (isActive ? ' nav__link-active' : '')}
              onClick={() => {
                toggleArrow();
                setIsMenuBooks(false);
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

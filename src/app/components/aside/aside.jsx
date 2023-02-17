/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import { getCategories, getError } from '../../../redux/actions/actions';

import './aside.css';

export const Aside = (props) => {
  const [arrow, setArrow] = useState('arrow-up');
  const [isGenresOpen, setIsGenresOpen] = useState(false);
  const [isActiveLink, setIsActiveLink] = useState(true);
  const isLoadCategories = useSelector((state) => state.reducer.isLoadCategories);
  const categories = useSelector((state) => state.reducer.categories);
  const errorCategories = useSelector((state) => state.reducer.errorCategories);
  const isShow = useSelector((state) => state.reducer.isShow);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());

    if (errorCategories) {
      dispatch(getError(true));
    }
  }, [dispatch, errorCategories]);

  const toggleArrow = () => {
    if (arrow === 'arrow-down') {
      setArrow('arrow-up');
    } else {
      setArrow('arrow-down');
    }

    setIsGenresOpen(!isGenresOpen);
  };
  console.log(categories);
  const closeError = () => {
    dispatch(getError(false));
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
            <li className=' all-books aside-item'>
              <NavLink
                data-test-id={props.isBurger ? 'burger-books' : 'navigation-books'}
                to='/'
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
        {/* {isShow ? (
          <div className='error-container' data-test-id='error'>
            <div className='error-content'>
              <div className='warning' />
              <h3 className='error-message'>Что-то пошло не так. Обновите страницу через некоторое время.</h3>
              <button type='button' className='close-message' onClick={closeError} />
            </div>
          </div>
        ) : isLoadCategories ? (
          <div className='loader-container' data-test-id='loader'>
            <div className='loader' />
          </div>
        ) : (
          categories && (
            <React.Fragment>
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
                      to='/'
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
            </React.Fragment>
          )
        )} */}
      </nav>
    </aside>
  );
};

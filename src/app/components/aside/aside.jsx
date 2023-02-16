import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import { getCategories } from '../../../redux/actions/actions';

import './aside.css';

export const Aside = (props) => {
  const [data] = useState(props.obj);
  const [arrow, setArrow] = useState('arrow-up');
  const [isGenresOpen, setIsGenresOpen] = useState(false);
  const [isActiveLink, setIsActiveLink] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const categories = useSelector((state) => state.reducer.categories);

  console.log(categories);

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
            <li className='aside-item'>
              <NavLink
                aria-hidden={false}
                to='/category/business'
                state={{
                  props: data.filter((e) => e.category.includes('Бизнес-книги')),
                }}
                // onClick={toggleArrow}
              >
                Бизнес-книги <span className='count'>14</span>
              </NavLink>
            </li>
            <li className='aside-item'>
              <NavLink
                to='/category/detectives'
                state={{
                  props: data.filter((e) => e.category.includes('Детективы')),
                }}
                aria-hidden={false}
                // onClick={toggleArrow}
              >
                Детективы <span className='count'>8</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/category/children'
                state={{
                  props: data.filter((e) => e.category.includes('Детские книги')),
                }}
                className={({ isActive }) => (isActive ? ' active' : 'aside-item')}
              >
                Детские книги <span className='count'>10</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/category/foreign'
                state={{
                  props: data.filter((e) => e.category.includes('Зарубежная литература')),
                }}
                className={({ isActive }) => (isActive ? ' active' : 'aside-item')}
              >
                Зарубежная литература <span className='count'>2</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/category/history'
                state={{
                  props: data.filter((e) => e.category.includes('История')),
                }}
                className={({ isActive }) => (isActive ? ' active' : 'aside-item')}
              >
                История <span className='count'>5</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/category/classical'
                state={{
                  props: data.filter((e) => e.category.includes('Классическая литература')),
                }}
                className={({ isActive }) => (isActive ? ' active' : 'aside-item')}
              >
                Классическая литература <span className='count'>12</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/category/psychology'
                state={{
                  props: data.filter((e) => e.category.includes('Книги по психологии')),
                }}
                className={({ isActive }) => (isActive ? ' active' : 'aside-item')}
              >
                Книги по психологии <span className='count'>11</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/category/computer'
                state={{
                  props: data.filter((e) => e.category.includes('Компьютерная литература')),
                }}
                className={({ isActive }) => (isActive ? ' active' : 'aside-item')}
              >
                Компьютерная литература <span className='count'>54</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/category/culture'
                state={{
                  props: data.filter((e) => e.category.includes('Культура и искусство')),
                }}
                className={({ isActive }) => (isActive ? ' active' : 'aside-item')}
              >
                Культура и искусство <span className='count'>0</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/category/science_and_education'
                state={{
                  props: data.filter((e) => e.category.includes('Наука и образование')),
                }}
                className={({ isActive }) => (isActive ? ' active' : 'aside-item')}
              >
                Наука и образование <span className='count'>2</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/category/journalistic'
                state={{
                  props: data.filter((e) => e.category.includes('Публицистическая литература')),
                }}
                className={({ isActive }) => (isActive ? ' active' : 'aside-item')}
              >
                {`${'Публицистическая '}`}
                <br />
                {`${'литература'}`} <span className='count'>0</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/category/reference'
                state={{
                  props: data.filter((e) => e.category.includes('Справочники')),
                }}
                className={({ isActive }) => (isActive ? ' active' : 'aside-item')}
              >
                Справочники <span className='count'>10</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/category/fantasy'
                state={{
                  props: data.filter((e) => e.category.includes('Фантастика')),
                }}
                className={({ isActive }) => (isActive ? ' active' : 'aside-item')}
              >
                Фантастика <span className='count'>12</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/category/humorous'
                state={{
                  props: data.filter((e) => e.category.includes('Юмористическая литература')),
                }}
                className={({ isActive }) => (isActive ? ' active' : 'aside-item')}
              >
                {`${'Юмористическая '}`}
                <br />
                {`${'литература '}`}
                <span className='count'>8</span>
              </NavLink>
            </li>
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

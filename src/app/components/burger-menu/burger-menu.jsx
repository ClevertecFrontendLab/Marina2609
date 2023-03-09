import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import { Aside } from '../aside/aside';

import './burger-menu.css';

export const BurgerMenu = () => {
  const [isMenuOpen, toggleMenu] = useState(false);
  const [isBurger] = useState(true);
  const navigate = useNavigate();

  const toggleMenuMode = () => {
    toggleMenu(!isMenuOpen);
  };

  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/auth');
  };

  return (
    <div className='burger-menu' data-test-id='button-burger'>
      <button
        type='button'
        className={classNames('burger-menu__button', { visible: isMenuOpen })}
        onClick={toggleMenuMode}
      >
        <span className='burger-menu__lines' />
      </button>
      <div
        aria-hidden={true}
        className={classNames('burger-menu__nav', { hide: !isMenuOpen })}
        onClick={toggleMenuMode}
      >
        <div className='burger-menu__content'>
          <Aside isBurger={isBurger} />
        </div>
        <div className='separation' />
        <div className='burger-menu__content'>
          <NavLink to='/account' className={({ isActive }) => (isActive ? ' active' : 'nav__item')}>
            Профиль
          </NavLink>
          <div
            aria-hidden={true}
            onClick={logOut}
            data-test-id='exit-button'
            className={({ isActive }) => (isActive ? ' active' : 'nav__item')}
          >
            Выход
          </div>
        </div>
      </div>
      {/* <div className='burger-menu__overlay' aria-hidden={true} onClick={() => toggleMenu(false)} /> */}
    </div>
  );
};

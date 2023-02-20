import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import { Aside } from '../aside/aside';

import './header.css';

export const Header = () => {
  const userName = 'Иван';
  const [isMenuOpen, toggleMenu] = useState(false);
  const [isBurger] = useState(true);

  const toggleMenuMode = () => {
    toggleMenu(!isMenuOpen);
  };

  return (
    <header className='header-container'>
      <div className='logo-container'>
        <div className='logo' />
        <p>Cleverland</p>
      </div>
      <div className='header-content'>
        <div className='burger-menu' data-test-id='button-burger'>
          <button
            type='button'
            className={classNames('burger-menu_button', { visible: isMenuOpen })}
            onClick={toggleMenuMode}
          >
            <span className='burger-menu_lines' />
          </button>
          <div className={classNames('burger-menu_nav', { hide: !isMenuOpen })}>
            <div className='burger-menu-content'>
              <Aside isBurger={isBurger} />
            </div>
            <div className='separation' />
            <div className='burger-menu-content'>
              <NavLink to='/account' className={({ isActive }) => (isActive ? ' active' : 'aside-item')}>
                Профиль
              </NavLink>
              <NavLink to='/logOut' className={({ isActive }) => (isActive ? ' active' : 'aside-item')}>
                Выход
              </NavLink>
            </div>
          </div>
          {/* <div className='burger-menu_overlay' aria-hidden={true} onClick={() => toggleMenu(false)} /> */}
        </div>
        <h1>Библиотека</h1>
        <div className='user'>
          <p className='user-title'>Привет, {userName}!</p>
          <div className='user-avatar' />
        </div>
      </div>
    </header>
  );
};

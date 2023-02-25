import React from 'react';

import { BurgerMenu } from '../burger-menu/burger-menu';

import './header.css';

export const Header = () => {
  const userName = 'Иван';

  return (
    <header className='header'>
      <div className='header-logo'>
        <div className='header-logo__icon' />
        <p>Cleverland</p>
      </div>
      <div className='header__content'>
        <BurgerMenu />
        <h1>Библиотека</h1>
        <div className='user'>
          <p className='user__title'>Привет, {userName}!</p>
          <div className='user__avatar' />
        </div>
      </div>
    </header>
  );
};

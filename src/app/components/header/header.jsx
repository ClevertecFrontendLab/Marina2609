import React, { useState } from 'react';
import classNames from 'classnames';

import { BurgerMenu } from '../burger-menu/burger-menu';
import { Settings } from '../settings/settings';

import './header.css';

export const Header = () => {
  const user = localStorage.getItem('user');
  const [isSetting, setIsSetting] = useState(false);

  const toggleSetting = () => {
    setIsSetting(!isSetting);
  };

  return (
    <header className={classNames('header', { shadow: isSetting })}>
      <div className='header-logo'>
        <div className='header-logo__icon' />
        <p>Cleverland</p>
      </div>
      <div className='header__content'>
        <BurgerMenu />
        <h1>Библиотека</h1>
        <div className='user' aria-hidden={true} onClick={toggleSetting}>
          <p className='user__title'>Привет, {user}!</p>
          <div className='user__avatar'>{isSetting && <Settings />}</div>
        </div>
      </div>
    </header>
  );
};

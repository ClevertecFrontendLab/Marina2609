import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import './settings.css';

export const Settings = () => {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/auth');
  };

  return (
    <div className='setting__content'>
      <NavLink to='/account' className={({ isActive }) => (isActive ? ' active' : 'nav__item')}>
        Профиль
      </NavLink>
      <div aria-hidden={true} onClick={logOut} className={({ isActive }) => (isActive ? ' active' : 'nav__item')}>
        Выход
      </div>
    </div>
  );
};

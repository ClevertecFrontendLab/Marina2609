import React from 'react';
import { useDispatch } from 'react-redux';

import { getError } from '../../../../store/actions/actions';

import './error-message.css';

export const ErrorMessage = () => {
  const dispatch = useDispatch();

  const closeError = () => {
    dispatch(getError(false));
  };

  return (
    <div className='error' data-test-id='error'>
      <div className='error-content'>
        <div className='error-content__icon_warning' />
        <h3 className='error-content__message'>Что-то пошло не так. Обновите страницу через некоторое время.</h3>
        <button type='button' aria-label='button' className='error-content__button' onClick={closeError} />
      </div>
    </div>
  );
};

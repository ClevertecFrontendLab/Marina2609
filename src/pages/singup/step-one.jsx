import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { CannotBeEmpty, CannotBeEmpty2 } from '../../app/components/messages/cannot-be-empty/cannot-be-empty';
import { getMessage, getMessage2 } from '../../store/actions/actions';

import { StepTwo } from './step-two';

export const StepOne = () => {
  const [isToggleEye, setIsToggleEye] = useState(false);
  const [isEye, setIsEye] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const [userNameError, setUserNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const shouldUserName = (data) => {
    const patternLogin = new RegExp(/[A-Za-z0-9]/);
    const pattern = new RegExp(/[0-9]/);

    if (data.length === 0) {
      setUserNameError('');
    } else if (!patternLogin.test(data)) {
      dispatch(getMessage('Используйте для логина латинский алфавит и цифры'));
      setUserNameError(<CannotBeEmpty />);
    } else if (pattern.test(data)) {
      setUserNameError('');
    } else {
      dispatch(getMessage('Используйте для логина латинский алфавит и цифры'));
      setUserNameError(<CannotBeEmpty />);
    }

    setUserName(data);
  };

  const shouldBlurUserName = (data) => {
    if (data.length === 0) {
      dispatch(getMessage('Поле не может быть пустым'));
      setUserNameError(<CannotBeEmpty />);
    } else if (!/[A-Za-z][0-9]/.test(data)) {
      dispatch(getMessage('Используйте для логина латинский алфавит и цифры'));
      setUserNameError(<CannotBeEmpty />);
    } else if (/[0-9]/.test(data)) {
      setUserNameError('');
    } else {
      dispatch(getMessage('Используйте для логина латинский алфавит и цифры'));
      setUserNameError(<CannotBeEmpty />);
    }

    setUserName(data);
  };

  const shouldPassword = (data) => {
    if (data.length === 0) {
      setIsEye(false);
    } else {
      setIsEye(true);
    }

    setPassword(data);

    if (data.length === 0) {
      setPasswordError('');
    } else if (/^(?=.*[A-Z])(?=.*?[A-ZА-Я])(?=.*?[a-zа-я])(?=.*?[0-9]).{8,}$/.test(data)) {
      setPasswordError('');
      setIsCheck(false);
    } else {
      dispatch(getMessage2('Пароль не менее 8 символов, с заглавной буквой и цифрой'));
      setPasswordError(<CannotBeEmpty2 />);
      setIsCheck(false);
    }
  };

  const shouldBlurPassword = (data) => {
    if (data.length === 0) {
      dispatch(getMessage2('Поле не может быть пустым'));
      setPasswordError(<CannotBeEmpty2 />);
      setIsCheck(false);
    } else if (/^(?=.*[A-Z])(?=.*?[A-ZА-Я])(?=.*?[a-zа-я])(?=.*?[0-9]).{8,}$/.test(data)) {
      setPasswordError('');
      setIsCheck(true);
      setIsValid(true);
    } else if (/[A-Z]/.test(data)) {
      setPasswordError('');
      setIsCheck(false);
    } else {
      dispatch(getMessage2('Пароль не менее 8 символов, с заглавной буквой и цифрой'));
      setPasswordError(<CannotBeEmpty2 />);
      setIsCheck(false);
    }
  };

  const onSubmit = () => {
    if (isValid) {
      <StepTwo />;
    }
  };

  const toggleEye = (event) => {
    event.preventDefault();

    setIsToggleEye(!isToggleEye);
  };

  return (
    <React.Fragment>
      <div className='registration__step'>1 шаг из 3</div>

      <form onSubmit={handleSubmit(onSubmit)} data-test-id='register-form' className='registration__form'>
        <div className='text-field text-field_floating-3'>
          <input
            type='text'
            id='username'
            name='username'
            placeholder='Логин'
            {...register('username', {
              required: true,
              onChange: (e) => shouldUserName(e.target.value),
              onBlur: (e) => shouldBlurUserName(e.target.value),
            })}
            className={classNames('registration__input', {
              registration__error: userNameError,
            })}
          />
          <label className='registration__label' htmlFor='username'>
            Придумайте логин для входа
          </label>
        </div>

        {userNameError ? (
          userNameError
        ) : (
          <div className='registration__reminder registration__reminder_hint' data-test-id='hint'>
            <span> Используйте для логина латинский алфавит и цифры</span>
          </div>
        )}

        <div className='text-field text-field_floating-3 eye'>
          <input
            type={isToggleEye ? 'text' : 'password'}
            id='password'
            name='password'
            placeholder='Пароль'
            {...register('password', {
              required: true,
              onChange: (e) => shouldPassword(e.target.value),
              onBlur: (e) => shouldBlurPassword(e.target.value),
            })}
            className={classNames('registration__input', {
              registration__error: passwordError,
            })}
          />
          {isCheck && <input type='img' value='' className='registration__input_check' data-test-id='checkmark' />}
          {isEye && (
            <input
              type='img'
              value=''
              data-test-id={isToggleEye ? 'eye-opened' : 'eye-closed'}
              className={
                isToggleEye
                  ? 'registration__input_eye registration__input_eye-opened'
                  : 'registration__input_eye registration__input_eye-closed'
              }
              onClick={toggleEye}
            />
          )}
          <label className='registration__label' htmlFor='password'>
            Пароль
          </label>
        </div>

        {passwordError ? (
          passwordError
        ) : (
          <div className='registration__reminder registration__reminder_hint' data-test-id='hint'>
            <span> Пароль не менее 8 символов, с заглавной буквой и цифрой</span>
          </div>
        )}
        <button type='submit' className='registration__button' disabled={!isValid && 'disabled'}>
          следующий шаг
        </button>
      </form>
    </React.Fragment>
  );
};

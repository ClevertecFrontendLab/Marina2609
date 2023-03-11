import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import { Loader } from '../../app/components/loader/loader';
import { CannotBeEmpty, CannotBeEmpty2 } from '../../app/components/messages/cannot-be-empty/cannot-be-empty';
import { getMessage, getMessage2 } from '../../store/actions/actions';

import { StepThree } from './step-three';

export const StepTwo = () => {
  const [isValid, setIsValid] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');

  const isRegister = useSelector((state) => state.isRegister);

  const { register, handleSubmit } = useForm();

  const shouldUserName = (data) => {
    // if (data.length === 0) {
    //   setUserNameError('');
    // } else if (!patternLogin.test(data)) {
    //   dispatch(getMessage('Используйте для логина латинский алфавит и цифры'));
    //   setUserNameError(<CannotBeEmpty />);
    // } else if (pattern.test(data)) {
    //   setUserNameError('');
    // } else {
    //   dispatch(getMessage('Используйте для логина латинский алфавит и цифры'));
    //   setUserNameError(<CannotBeEmpty />);
    // }
    // setUserName(data);
  };

  const shouldBlurUserName = (data) => {
    // if (data.length === 0) {
    //   dispatch(getMessage('Поле не может быть пустым'));
    //   setUserNameError(<CannotBeEmpty />);
    // } else if (!/[A-Za-z][0-9]/.test(data)) {
    //   dispatch(getMessage('Используйте для логина латинский алфавит и цифры'));
    //   setUserNameError(<CannotBeEmpty />);
    // } else if (/[0-9]/.test(data)) {
    //   setUserNameError('');
    // } else {
    //   dispatch(getMessage('Используйте для логина латинский алфавит и цифры'));
    //   setUserNameError(<CannotBeEmpty />);
    // }
    // setUserName(data);
  };

  const shouldPassword = (data) => {
    // if (data.length === 0) {
    //   setIsEye(false);
    // } else {
    //   setIsEye(true);
    // }
    // setPassword(data);
    // if (data.length === 0) {
    //   setPasswordError('');
    // } else if (/^(?=.*[A-Z])(?=.*?[A-ZА-Я])(?=.*?[a-zа-я])(?=.*?[0-9]).{8,}$/.test(data)) {
    //   setPasswordError('');
    // } else if (/[A-Z]/.test(data)) {
    //   dispatch(getMessage2('Пароль не менее 8 символов, с заглавной буквой и цифрой'));
    //   setPasswordError(<CannotBeEmpty2 />);
    // } else {
    //   dispatch(getMessage2('Пароль не менее 8 символов, с заглавной буквой и цифрой'));
    //   setPasswordError(<CannotBeEmpty2 />);
    // }
  };

  const shouldBlurPassword = (data) => {
    // if (data.length === 0) {
    //   dispatch(getMessage2('Поле не может быть пустым'));
    //   setPasswordError(<CannotBeEmpty2 />);
    // } else if (/^(?=.*[A-Z])(?=.*?[A-ZА-Я])(?=.*?[a-zа-я])(?=.*?[0-9]).{8,}$/.test(data)) {
    //   dispatch(getMessage2('Пароль не менее 8 символов, с заглавной буквой и цифрой'));
    //   setPasswordError(<CannotBeEmpty2 />);
    // } else {
    //   setPasswordError('');
    //   setIsCheck(true);
    //   setIsValid(true);
    // }
  };

  const onSubmit = () => {
    // dispatch(fetchRegister(email, username, password, fname, lName, mobile));

    if (isValid) {
      <StepThree />;
    }
  };

  return (
    <React.Fragment>
      <div className='registration__step'>2 шаг из 3</div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        data-test-id='register-form'
        className={firstNameError ? 'registration__form' : 'registration__form2'}
      >
        <div className='text-field text-field_floating-3'>
          <input
            type='text'
            id='firstName'
            name='firstName'
            placeholder='Имя'
            {...register('firstName')}
            onChange={(e) => setFirstName(e.target.value)}
            // onBlur={shouldBlurLogin}
            className={classNames('registration__input', {
              registration__error: firstNameError,
            })}
          />
          <label className='registration__label' htmlFor='firstName'>
            Имя
          </label>
        </div>

        {firstNameError}

        <div className='text-field text-field_floating-3 eye'>
          <input
            type='text'
            id='lastName'
            name='lastName'
            placeholder='Фамилия'
            {...register('lastName')}
            onChange={(e) => setLastNameError(e.target.value)}
            // onBlur={shouldBlurPassword}
            className={classNames('registration__input', {
              registration__error: lastNameError,
            })}
          />
          <label className='registration__label' htmlFor='lastName'>
            Фамилия
          </label>
        </div>

        {lastNameError}

        <button type='submit' className='registration__button'>
          последний шаг
        </button>
      </form>
    </React.Fragment>
  );
};

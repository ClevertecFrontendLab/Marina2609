import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import { Loader } from '../../app/components/loader/loader';
import { CannotBeEmpty } from '../../app/components/messages/cannot-be-empty/cannot-be-empty';
import { getMessage } from '../../store/actions/actions';
import { fetchRegistr } from '../../store/actions/registr-actions';

import './singup.css';

export const SingUp = () => {
  const [step, setStep] = useState(1);
  const [isToggleEye, setIsToggleEye] = useState(false);
  const [isEye, setIsEye] = useState(false);
  const [isCheck, setIsCheck] = useState(false);

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const [userNameError, setUserNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const isRegister = useSelector((state) => state.isRegister);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const onSubmit = () => {
    // dispatch(fetchRegister(email, username, password, fname, lName, mobile));
    // '^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd]{8,}$'

    const patternLogin = new RegExp(/[A-Za-z0-9]/);
    const patternPassword = new RegExp('(?=.*[0-9])(?=.*[A-Z])[a-zA-Zd]');

    if (username.length === 0 || password.length === 0) {
      dispatch(getMessage('Поле не может быть пустым'));
      setUserNameError(<CannotBeEmpty />);
    }

    if (!patternLogin.test(username)) {
      dispatch(getMessage('Используйте для логина латинский алфавит и цифры'));
      console.log('error login');
      setUserNameError(<CannotBeEmpty />);
    } else {
      setUserNameError('');
    }

    if (password.length < 8) {
      console.log('error password length');
      setPasswordError(<CannotBeEmpty />);
    } else if (!patternPassword.test(password)) {
      console.log('error password');
      setPasswordError(<CannotBeEmpty />);
    } else {
      setPasswordError('');
    }

    setStep(step + 1);
  };

  const toggleEye = (event) => {
    event.preventDefault();

    setIsToggleEye(!isToggleEye);
  };

  const eyeShow = (event) => {
    event.preventDefault();

    if (event.target.value.length === 0) {
      setIsEye(false);
    } else {
      setIsEye(true);
    }

    setPassword(event.target.value);
  };

  const shouldBlurUserName = (event) => {
    if (event.target.value.length === 0) {
      dispatch(getMessage('Поле не может быть пустым'));
      setUserNameError(<CannotBeEmpty />);
    } else {
      setUserNameError('');
    }
  };

  const shouldBlurPassword = (event) => {
    if (event.target.value.length === 0) {
      dispatch(getMessage('Поле не может быть пустым'));
      setPasswordError(<CannotBeEmpty />);
    } else {
      setPasswordError('');
    }
  };

  return (
    <section className='registration' data-test-id='auth'>
      {isRegister && <Loader />}
      <div className='registration__logo'>Cleverland</div>

      <div className='registration__window'>
        <div className='registration__header'>Регистрация</div>
        <div className='registration__step'>{step} шаг из 3</div>
        {step === 1 && (
          <form onSubmit={handleSubmit(onSubmit)} data-test-id='register-form'>
            <div className='text-field text-field_floating-3'>
              <input
                type='text'
                id='username'
                name='username'
                placeholder='Логин'
                {...register('username')}
                onChange={(e) => setUserName(e.target.value)}
                onBlur={shouldBlurUserName}
                className={classNames('registration__input_login', {
                  registration__error: userNameError,
                })}
              />
              <label className='registration__label_login' htmlFor='username'>
                Придумайте логин для входа
              </label>
            </div>

            {userNameError ? (
              userNameError
            ) : (
              <div className='registration__reminder'>Используйте для логина латинский алфавит и цифры</div>
            )}

            <div className='text-field text-field_floating-3 eye'>
              <input
                type={isToggleEye ? 'text' : 'password'}
                id='password'
                name='password'
                placeholder='Пароль'
                {...register('password')}
                onChange={eyeShow}
                onBlur={shouldBlurPassword}
                className={classNames('registration__input_password', {
                  registration__error: passwordError,
                })}
              />
              {isCheck && <input type='img' value='' className='registration__input_check' />}
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
              <label className='registration__label_password' htmlFor='password'>
                Пароль
              </label>
            </div>

            {passwordError ? (
              passwordError
            ) : (
              <div className='registration__reminder'>Пароль не менее 8 символов, с заглавной буквой и цифрой</div>
            )}
            <button type='submit' className='registration__button'>
              следующий шаг
            </button>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={handleSubmit(onSubmit)} data-test-id='register-form'>
            <div className='text-field text-field_floating-3'>
              <input
                type='text'
                id='firstName'
                name='firstName'
                placeholder='Имя'
                {...register('firstName')}
                onChange={(e) => setUserName(e.target.value)}
                // onBlur={shouldBlurLogin}
                className={classNames('registration__input_fname', {
                  registration__error: setFirstNameError,
                })}
              />
              <label className='registration__label_fname' htmlFor='firstName'>
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
                onChange={(e) => setUserName(e.target.value)}
                // onBlur={shouldBlurPassword}
                className={classNames('registration__input_lname', {
                  registration__error: setLastNameError,
                })}
              />
              <label className='registration__label_lname' htmlFor='lastName'>
                Фамилия
              </label>
            </div>

            {lastNameError}

            <button type='submit' className='registration__button'>
              последний шаг
            </button>
          </form>
        )}
        {step === 3 && (
          <form onSubmit={handleSubmit(onSubmit)} data-test-id='register-form'>
            <div className='text-field text-field_floating-3'>
              <input
                type='text'
                id='phone'
                name='phone'
                placeholder='Номер телефона'
                {...register('phone')}
                onChange={(e) => setPhone(e.target.value)}
                // onBlur={shouldBlurLogin}
                className={classNames('registration__input_phone', {
                  registration__error: setPhoneError,
                })}
              />
              <label className='registration__label_phone' htmlFor='phone'>
                Имя
              </label>
            </div>

            {phoneError}

            <div className='text-field text-field_floating-3 eye'>
              <input
                type='text'
                id='email'
                name='email'
                placeholder='E-mail'
                {...register('email')}
                onChange={(e) => setUserName(e.target.value)}
                // onBlur={shouldBlurPassword}
                className={classNames('registration__input_email', {
                  registration__error: setEmailError,
                })}
              />
              <label className='registration__label_email' htmlFor='email'>
                Фамилия
              </label>
            </div>

            {emailError}

            <button type='submit' className='registration__button'>
              зарегистрироваться
            </button>
          </form>
        )}
        <div>
          <div className='registration__text'>
            Есть учётная запись?
            <Link to='/auth' className='registration__authentication'>
              <span>войти</span>
              <div className='authentication__arrow' />
            </Link>
          </div>
        </div>
      </div>

      <div className=''>psioozzz@tut.by Aliaksei Valadzko +375 (29) 512-32-60</div>

      {/* <input
            type='text'
            placeholder='email'
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            name='email'
          />
          <input
            type='text'
            placeholder='username'
            onChange={(e) => {
              setusername(e.target.value);
            }}
            name='username'
          />
          <input
            type='password'
            placeholder='password'
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            name='password'
          />
          <input
            type='text'
            placeholder='fName'
            onChange={(e) => {
              setFname(e.target.value);
            }}
            name='fName'
          />
          <input
            type='text'
            placeholder='lName'
            onChange={(e) => {
              setLname(e.target.value);
            }}
            name='lName'
          />
          <input
            type='text'
            placeholder='mobile'
            onChange={(e) => {
              setMobile(e.target.value);
            }}
            name='mobile'
          />
          <input type='submit' /> */}
      {/* {isRegister ? (
        <Navigate to='/login' />
      ) : (
        
      )} */}
    </section>
  );
};

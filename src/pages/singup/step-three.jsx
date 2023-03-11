import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import { Loader } from '../../app/components/loader/loader';
import { CannotBeEmpty, CannotBeEmpty2 } from '../../app/components/messages/cannot-be-empty/cannot-be-empty';
import { getMessage, getMessage2 } from '../../store/actions/actions';
import { fetchRegistr } from '../../store/actions/registr-actions';

export const StepThree = () => {
  const [step, setStep] = useState(1);
  const [error, setError] = useState(0);
  const [isToggleEye, setIsToggleEye] = useState(false);
  const [isEye, setIsEye] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [isValid, setIsValid] = useState(false);

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

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [navigate, token]);

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
    } else if (/[A-Z]/.test(data)) {
      dispatch(getMessage2('Пароль не менее 8 символов, с заглавной буквой и цифрой'));
      setPasswordError(<CannotBeEmpty2 />);
    } else {
      dispatch(getMessage2('Пароль не менее 8 символов, с заглавной буквой и цифрой'));
      setPasswordError(<CannotBeEmpty2 />);
    }
  };

  const shouldBlurPassword = (data) => {
    if (data.length === 0) {
      dispatch(getMessage2('Поле не может быть пустым'));
      setPasswordError(<CannotBeEmpty2 />);
    } else if (/^(?=.*[A-Z])(?=.*?[A-ZА-Я])(?=.*?[a-zа-я])(?=.*?[0-9]).{8,}$/.test(data)) {
      dispatch(getMessage2('Пароль не менее 8 символов, с заглавной буквой и цифрой'));
      setPasswordError(<CannotBeEmpty2 />);
    } else {
      setPasswordError('');
      setIsCheck(true);
      setIsValid(true);
    }
  };

  const onSubmit = () => {
    // dispatch(fetchRegister(email, username, password, fname, lName, mobile));
    // '^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd]{8,}$'
    // shouldBlurUserName();
    // shouldBlurPassword();

    if (isValid && step < 3) {
      setStep(step + 1);
    }
  };

  const toggleEye = (event) => {
    event.preventDefault();

    setIsToggleEye(!isToggleEye);
  };

  return (
    <section className='registration' data-test-id='auth'>
      {isRegister && <Loader />}
      <div className='registration__logo'>Cleverland</div>

      <div className='registration__window'>
        <div className='registration__header'>Регистрация</div>
        <div className='registration__step'>{step} шаг из 3</div>
        {step === 1 && (
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
        )}
        {step === 2 && (
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
                onChange={(e) => setUserName(e.target.value)}
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
                onChange={(e) => setUserName(e.target.value)}
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
        )}
        {step === 3 && (
          <form onSubmit={handleSubmit(onSubmit)} data-test-id='register-form' className='registration__form'>
            <div className='text-field text-field_floating-3'>
              <input
                type='text'
                id='phone'
                name='phone'
                placeholder='Номер телефона'
                {...register('phone')}
                onChange={(e) => setPhone(e.target.value)}
                // onBlur={shouldBlurLogin}
                className={classNames('registration__input', {
                  registration__error: phoneError,
                })}
              />
              <label className='registration__label' htmlFor='phone'>
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
                className={classNames('registration__input', {
                  registration__error: emailError,
                })}
              />
              <label className='registration__label' htmlFor='email'>
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
    </section>
  );
};

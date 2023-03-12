/* eslint-disable complexity */
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import MaskedInput from 'react-text-mask';
import classNames from 'classnames';

import { Loader } from '../../app/components/loader/loader';
import { CannotBeEmpty, CannotBeEmpty2 } from '../../app/components/messages/cannot-be-empty/cannot-be-empty';
import { getMessage, getMessage2 } from '../../store/actions/actions';
import { fetchRegistr } from '../../store/actions/registr-actions';

import './singup.css';

export const SingUp = () => {
  const [step, setStep] = useState(1);
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
  const [passwordError, setPasswordError] = useState({
    letters: false,
    numbers: false,
    length: false,
    message: '',
  });
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');

  const isRegistr = useSelector((state) => state.registr.isRegistr);
  const registr = useSelector((state) => state.registr.registr);
  const registerError = useSelector((state) => state.registr.registerError);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [navigate, token]);

  useEffect(() => {
    if (isRegistr) {
      <Loader />;
    }
  }, [isRegistr]);

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

    if (!data && passwordError.length && passwordError.letters && passwordError.numbers) {
      setPasswordError((passwordError) => ({
        ...passwordError,
        message: 'Пароль не менее 8 символов, с заглавной буквой и цифрой',
      }));
      setIsCheck(false);

      return;
    }

    if (data) {
      setPasswordError((passwordError) => ({
        ...passwordError,
        message: '',
      }));
    } else {
      setPasswordError((passwordError) => ({
        ...passwordError,
        message: 'Поле не может быть пустым',
      }));
    }

    if (data.length < 8) {
      if (data.length === 0) {
        setPasswordError((passwordError) => ({
          ...passwordError,
          message: 'Поле не может быть пустым',
        }));
      } else {
        setPasswordError((passwordError) => ({
          ...passwordError,
          length: true,
        }));
      }
    } else {
      setPasswordError((passwordError) => ({
        ...passwordError,
        length: false,
      }));
    }

    if (/\d+/.test(data)) {
      setPasswordError((passwordError) => ({
        ...passwordError,
        numbers: false,
      }));
    } else {
      setPasswordError((passwordError) => ({
        ...passwordError,
        numbers: true,
      }));
    }

    if (/[A-Z]/g.test(data)) {
      setPasswordError((passwordError) => ({
        ...passwordError,
        letters: false,
      }));
    } else {
      setPasswordError((passwordError) => ({
        ...passwordError,
        letters: true,
      }));
    }

    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(data)) {
      setPasswordError({
        letters: false,
        numbers: false,
        length: false,
        message: 'Пароль не менее 8 символов, с заглавной буквой и цифрой',
      });
      setIsCheck(true);
      setIsValid(true);
      setPassword(data);
    } else {
      setPasswordError((passwordError) => ({
        ...passwordError,
      }));
      setIsCheck(false);
    }
  };

  const validateFirstName = (data) => {
    if (data.trim()) {
      setFirstNameError('');
      setFirstName(data);
    } else {
      dispatch(getMessage('Поле не может быть пустым'));
      setFirstNameError(<CannotBeEmpty />);
    }
  };

  const validateLastName = (data) => {
    if (data.trim()) {
      setLastNameError('');
      setLastName(data);
    } else {
      dispatch(getMessage2('Поле не может быть пустым'));
      setLastNameError(<CannotBeEmpty2 />);
    }
  };

  const validatePhone = (data) => {
    if (data.trim()) {
      setPhoneError('');
      setPhone(data);
    } else {
      dispatch(getMessage('Поле не может быть пустым'));
      setPhoneError(<CannotBeEmpty />);
    }

    if (data.includes('x')) {
      dispatch(getMessage('В формате +375 (xx) xxx-xx-xx'));
      setPhoneError(<CannotBeEmpty />);
    }
  };

  const validateEmail = (data) => {
    if (/([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}/.test(data)) {
      setEmail(data);
    } else {
      dispatch(getMessage2('Введите корректный e-mail'));
      setEmailError(<CannotBeEmpty2 />);
    }
  };

  const checkEmail = (data) => {
    if (data.trim()) {
      validateEmail(data);
      setIsValid(true);
    } else {
      dispatch(getMessage2('Поле не может быть пустым'));
      setEmailError(<CannotBeEmpty2 />);
    }
  };

  const onSubmit = () => {
    if ((isValid && step === 1) || (lastName && firstName && step === 2)) {
      setStep(step + 1);
      setIsValid(false);
    }

    if (isValid && step === 3) {
      dispatch(fetchRegistr(email, username, password, firstName, lastName, phone));
    }
  };

  const toggleEye = (event) => {
    event.preventDefault();

    setIsToggleEye(!isToggleEye);
  };

  const submitHandlerRepeat = (data) => {
    dispatch(fetchRegistr(data.email, data.username, data.password, data.firstName, data.lastName, data.phone));
  };

  const submitHandlerBack = () => {
    navigate('/registration');
  };

  return (
    <section className='registration' data-test-id='auth'>
      {isRegistr && <Loader />}
      <div className='registration__logo'>Cleverland</div>

      {registerError === 500 ? (
        <div className='authentication__window_error'>
          <div className='authentication__header_error'>Данные не сохранились</div>

          <form onSubmit={submitHandlerRepeat}>
            <span className='authentication__text_error' data-test-id='status-block'>
              Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз
            </span>
            <button type='submit' className='repeat__button'>
              повторить
            </button>
          </form>
        </div>
      ) : registerError === 400 ? (
        <div className='authentication__window_error'>
          <div className='authentication__header_error'>Данные не сохранились</div>

          <form onSubmit={submitHandlerBack}>
            <span className='authentication__text_error' data-test-id='status-block'>
              Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail
            </span>
            <button type='submit' className='repeat__button'>
              назад к регистрации
            </button>
          </form>
        </div>
      ) : registr === 200 ? (
        <div className='authentication__window_error'>
          <div className='authentication__header_error' data-test-id='status-block'>
            Регистрация успешна
          </div>

          <form onSubmit={() => navigate('/auth')}>
            <span className='authentication__text_error'>
              Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль
            </span>
            <button type='submit' className='repeat__button'>
              вход
            </button>
          </form>
        </div>
      ) : (
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
                    onBlur: (e) => shouldPassword(e.target.value),
                  })}
                  className={classNames('registration__input', {
                    registration__error: passwordError.message,
                  })}
                />
                {isCheck && (
                  <input type='img' value='' className='registration__input_check' data-test-id='checkmark' />
                )}
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

              {passwordError.message === 'Поле не может быть пустым' ? (
                <div className='authentication__input-error' data-test-id='hint'>
                  Поле не может быть пустым
                </div>
              ) : passwordError.message ? (
                <div className='reset__reminder registration__reminder_hint' data-test-id='hint'>
                  Пароль не менее 8 символов, с заглавной буквой и цифрой
                </div>
              ) : (
                <div className='reset__reminder registration__reminder_hint' data-test-id='hint'>
                  Пароль
                  <span className={`${passwordError.length ? 'reset__input-error' : ''}`}>
                    &nbsp;не менее 8 символов
                  </span>
                  , с
                  <span className={`${passwordError.letters ? 'reset__input-error' : ''}`}>
                    &nbsp;заглавной буквой&nbsp;
                  </span>
                  и<span className={`${passwordError.numbers ? 'reset__input-error' : ''}`}>&nbsp;цифрой</span>
                </div>
              )}

              <button type='submit' className='registration__button' disabled={isValid ? false : true}>
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
                  {...register('firstName', {
                    required: true,
                    onChange: (e) => validateFirstName(e.target.value),
                    onBlur: (e) => validateFirstName(e.target.value),
                  })}
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
                  {...register('lastName', {
                    required: true,
                    onBlur: (e) => validateLastName(e.target.value),
                    onChange: (e) => validateLastName(e.target.value),
                  })}
                  className={classNames('registration__input', {
                    registration__error: lastNameError,
                  })}
                />
                <label className='registration__label' htmlFor='lastName'>
                  Фамилия
                </label>
              </div>

              {lastNameError}

              <button type='submit' className='registration__button' disabled={lastName && firstName ? false : true}>
                последний шаг
              </button>
            </form>
          )}
          {step === 3 && (
            <form onSubmit={handleSubmit(onSubmit)} data-test-id='register-form' className='registration__form'>
              <div className='text-field text-field_floating-3'>
                <MaskedInput
                  type='tel'
                  id='phone'
                  name='phone'
                  placeholderChar='x'
                  mask={[
                    '+',
                    '3',
                    '7',
                    '5',
                    ' ',
                    '(',
                    /[1-9]/,
                    /\d/,
                    ')',
                    ' ',
                    /\d/,
                    /\d/,
                    /\d/,
                    '-',
                    /\d/,
                    /\d/,
                    '-',
                    /\d/,
                    /\d/,
                  ]}
                  showMask={false}
                  {...register('phone', {
                    required: true,
                    onBlur: (e) => validatePhone(e.target.value),
                    onChange: (e) => validatePhone(e.target.value),
                  })}
                  className={classNames('registration__input', {
                    registration__error: phoneError,
                  })}
                />
                <label className='registration__label' htmlFor='phone'>
                  Номер телефона
                </label>
              </div>

              {phoneError ? (
                phoneError
              ) : (
                <div className='registration__reminder registration__reminder_hint' data-test-id='hint'>
                  <span>В формате +375 (xx) xxx-xx-xx</span>
                </div>
              )}

              <div className='text-field text-field_floating-3 eye'>
                <input
                  type='text'
                  id='email'
                  name='email'
                  placeholder='E-mail'
                  {...register('email', {
                    required: true,
                    onChange: (e) => checkEmail(e.target.value),
                    onBlur: (e) => checkEmail(e.target.value),
                  })}
                  className={classNames('registration__input', {
                    registration__error: emailError,
                  })}
                />
                <label className='registration__label' htmlFor='email'>
                  E-mail
                </label>
              </div>

              {emailError}

              <button
                type='submit'
                className='registration__button'
                onClick={onSubmit}
                disabled={isValid ? false : true}
              >
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
      )}

      <div className=''>psioozzz@tut.by Aliaksei Valadzko +375 (29) 512-32-60</div>
    </section>
  );
};

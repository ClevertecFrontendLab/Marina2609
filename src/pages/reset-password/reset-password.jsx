/* eslint-disable complexity */
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { Loader } from '../../app/components/loader/loader';
import { CannotBeEmpty, CannotBeEmpty2 } from '../../app/components/messages/cannot-be-empty/cannot-be-empty';
import { getMessage, getMessage2 } from '../../store/actions/actions';
import { fetchRecovery } from '../../store/actions/recovery-actions';

import './reset-password.css';

export const ResetPassword = (props) => {
  const [code] = useState(props.code);
  const [isValid, setIsValid] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [passwordError, setPasswordError] = useState({
    letters: false,
    numbers: false,
    length: false,
    message: '',
  });
  const [passwordConfirmationError, setPasswordConfirmationError] = useState({
    letters: false,
    numbers: false,
    length: false,
    message: '',
  });
  const [isCheck, setIsCheck] = useState(false);
  const [isEye, setIsEye] = useState(false);
  const [isEyeRepeat, setIsEyeRepeat] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowPasswordConfirmation, setIsShowPasswordConfirmation] = useState(false);

  const [isPasswordSuccess, setIsPasswordSuccess] = useState(false);

  const resetPassword = useSelector((state) => state.reset.reset);
  const recoveryError = useSelector((state) => state.recovery.recoveryError);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    setIsPasswordSuccess(resetPassword);
  }, [resetPassword]);

  const validatePassword = (data) => {
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
      // setIsValid(true);
      setPassword(data);
    } else {
      setPasswordError((passwordError) => ({
        ...passwordError,
      }));
      setIsCheck(false);
    }
  };

  const validatePasswordConfirmation = (data) => {
    if (data.length === 0) {
      setIsEyeRepeat(false);
    } else {
      setIsEyeRepeat(true);
    }

    if (!data && passwordError.length && passwordError.letters && passwordError.numbers) {
      setPasswordConfirmationError((passwordError) => ({
        ...passwordError,
        message: 'Пароль не менее 8 символов, с заглавной буквой и цифрой',
      }));

      return;
    }

    if (data) {
      setPasswordConfirmationError((passwordError) => ({
        ...passwordError,
        message: '',
      }));
    } else {
      setPasswordConfirmationError((passwordError) => ({
        ...passwordError,
        message: 'Поле не может быть пустым',
      }));
    }

    if (password === data) {
      setPasswordConfirmationError((passwordError) => ({
        ...passwordError,
        message: '',
      }));
    } else {
      setPasswordConfirmationError((passwordError) => ({
        ...passwordError,
        message: 'Пароли не совпадают',
      }));
    }

    if (data.length < 8) {
      if (data.length === 0) {
        setPasswordConfirmationError((passwordError) => ({
          ...passwordError,
          message: 'Поле не может быть пустым',
        }));
      } else {
        setPasswordConfirmationError((passwordError) => ({
          ...passwordError,
          length: true,
        }));
      }
    } else {
      setPasswordConfirmationError((passwordError) => ({
        ...passwordError,
        length: false,
      }));
    }

    if (/\d+/.test(data)) {
      setPasswordConfirmationError((passwordError) => ({
        ...passwordError,
        numbers: false,
      }));
    } else {
      setPasswordConfirmationError((passwordError) => ({
        ...passwordError,
        numbers: true,
      }));
    }

    if (/[A-Z]/g.test(data)) {
      setPasswordConfirmationError((passwordError) => ({
        ...passwordError,
        letters: false,
      }));
    } else {
      setPasswordConfirmationError((passwordError) => ({
        ...passwordError,
        letters: true,
      }));
    }

    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(data)) {
      setPasswordConfirmationError({
        letters: false,
        numbers: false,
        length: false,
        message: 'Пароль не менее 8 символов, с заглавной буквой и цифрой',
      });
      setIsValid(true);
      setPasswordConfirmation(data);
    } else {
      setPasswordConfirmationError((passwordError) => ({
        ...passwordError,
      }));
    }
  };

  const onSubmit = (data) => {
    dispatch(fetchRecovery(data.password, data.passwordConfirmation, code));
  };

  return isPasswordSuccess ? (
    <div className='authentication__window_error'>
      <div className='authentication__header_error' data-test-id='status-block'>
        Новые данные сохранены
      </div>

      <form onSubmit={navigate('/auth')}>
        <span className='recovery__text_sand'>Зайдите в личный кабинет, используя свои логин и новый пароль</span>
        <button type='submit' className='recovery__button'>
          вход
        </button>
      </form>
    </div>
  ) : recoveryError ? (
    <div className='authentication__window_error'>
      <div className='authentication__header_error' data-test-id='status-block'>
        Данные не сохранились
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <span className='recovery__text_sand'>Что-то пошло не так. Попробуйте ещё раз</span>
        <button type='submit' className='recovery__button'>
          повторить
        </button>
      </form>
    </div>
  ) : (
    <div className='reset__window'>
      <div className='reset__header'>Восстановление пароля</div>

      <form className='reset__form' onSubmit={handleSubmit(onSubmit)} data-test-id='reset-password-form'>
        <div className='text-field text-field_floating-3'>
          <input
            type={isShowPassword ? 'text' : 'password'}
            id='password'
            name='password'
            placeholder='Новый пароль'
            {...register('password', {
              required: true,
              onChange: (e) => validatePassword(e.target.value),
              onBlur: (e) => validatePassword(e.target.value),
            })}
            className={classNames('authentication__input_password', {
              authentication__error: passwordError.message,
            })}
          />
          {isCheck && <input type='img' value='' className='registration__input_check' data-test-id='checkmark' />}
          {isEye && (
            <input
              type='img'
              value=''
              data-test-id={isShowPassword ? 'eye-opened' : 'eye-closed'}
              className={
                isShowPassword
                  ? 'authentication__input_eye authentication__input_eye-opened'
                  : 'authentication__input_eye authentication__input_eye-closed'
              }
              onClick={() => setIsShowPassword(!isShowPassword)}
            />
          )}
          <label className='authentication__label_password' htmlFor='password'>
            Новый пароль
          </label>
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
              <span className={`${passwordError.length ? 'reset__input-error' : ''}`}>&nbsp;не менее 8 символов</span>,
              с
              <span className={`${passwordError.letters ? 'reset__input-error' : ''}`}>
                &nbsp;заглавной буквой&nbsp;
              </span>
              и<span className={`${passwordError.numbers ? 'reset__input-error' : ''}`}>&nbsp;цифрой</span>
            </div>
          )}
        </div>

        <div className='text-field text-field_floating-3 eye'>
          <input
            type={isShowPasswordConfirmation ? 'text' : 'password'}
            id='passwordConfirmation'
            name='passwordConfirmation'
            placeholder='Повторите пароль'
            {...register('passwordConfirmation', {
              required: true,
              onChange: (e) => validatePasswordConfirmation(e.target.value),
              onBlur: (e) => validatePasswordConfirmation(e.target.value),
            })}
            className={classNames('authentication__input_password', {
              authentication__error: passwordConfirmationError.message,
            })}
          />

          {isEyeRepeat && (
            <input
              type='img'
              value=''
              data-test-id={isShowPasswordConfirmation ? 'eye-opened' : 'eye-closed'}
              className={
                isShowPasswordConfirmation
                  ? 'authentication__input_eye authentication__input_eye-opened'
                  : 'authentication__input_eye authentication__input_eye-closed'
              }
              onClick={() => setIsShowPasswordConfirmation(!isShowPasswordConfirmation)}
            />
          )}
          <label className='authentication__label_password' htmlFor='passwordConfirmation'>
            Повторите пароль
          </label>

          {passwordConfirmationError.message === 'Поле не может быть пустым' ? (
            <div className='authentication__input-error' data-test-id='hint'>
              Поле не может быть пустым
            </div>
          ) : passwordConfirmationError.message === 'Пароли не совпадают' ? (
            <div className='authentication__input-error' data-test-id='hint'>
              Пароли не совпадают
            </div>
          ) : passwordConfirmationError.message ? (
            <div className='reset__reminder registration__reminder_hint' data-test-id='hint'>
              Пароль не менее 8 символов, с заглавной буквой и цифрой
            </div>
          ) : (
            <div className='reset__reminder registration__reminder_hint' data-test-id='hint'>
              Пароль
              <span className={`${passwordError.length ? 'reset__input-error' : ''}`}>&nbsp;не менее 8 символов</span>,
              с
              <span className={`${passwordError.letters ? 'reset__input-error' : ''}`}>
                &nbsp;заглавной буквой&nbsp;
              </span>
              и<span className={`${passwordError.numbers ? 'reset__input-error' : ''}`}>&nbsp;цифрой</span>
            </div>
          )}
        </div>

        <button type='submit' className='reset__button' disabled={isValid ? false : true}>
          сохранить изменения
        </button>
      </form>
      <div className='reset__text'>После сохранения войдите в библиотеку, используя новый пароль</div>
    </div>
  );
};

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import { Loader } from '../../app/components/loader/loader';
import { CannotBeEmpty } from '../../app/components/messages/cannot-be-empty/cannot-be-empty';
import { getMessage } from '../../store/actions/actions';
import { fetchLogin } from '../../store/actions/login-actions';

import './singin.css';

export const SingIn = () => {
  const [isEye, setIsEye] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isError, setIsError] = useState(false);
  const [identifierError, setIdentifierError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const isAuth = useSelector((state) => state.login.isAuth);
  const authError = useSelector((state) => state.login.authError);
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (token) {
      navigate('/books/all');
    }
  }, [navigate, token]);

  useEffect(() => {
    if (authError === 400) {
      setIsError(false);
    } else {
      setIsError(true);
    }
  }, [authError]);

  const onSubmit = (data) => {
    dispatch(fetchLogin(data.identifier, data.password));
  };

  const submitHandlerRepeat = (data) => {
    setIsError(false);
    dispatch(fetchLogin(data.identifier, data.password));
  };

  const validateIdentifier = (data) => {
    if (data.trim()) {
      setIdentifierError('');
    } else {
      dispatch(getMessage('Поле не может быть пустым'));
      setIdentifierError(<CannotBeEmpty />);
    }
  };

  const validatePassword = (data) => {
    if (data.length === 0) {
      setIsEye(false);
    } else {
      setIsEye(true);
    }

    if (data.trim()) {
      setPasswordError('');
    } else {
      dispatch(getMessage('Поле не может быть пустым'));
      setPasswordError(<CannotBeEmpty />);
    }
  };

  return (
    <section className='authentication' data-test-id='auth'>
      {isAuth && <Loader />}
      <div className='authentication__logo'>Cleverland</div>
      {authError && isError ? (
        <div className='authentication__window_error'>
          <div className='authentication__header_error' data-test-id='status-block'>
            Вход не выполнен
          </div>

          <form onSubmit={submitHandlerRepeat}>
            <span className='authentication__text_error'>Что-то пошло не так. Попробуйте ещё раз</span>
            <button type='submit' className='repeat__button'>
              повторить
            </button>
          </form>
        </div>
      ) : (
        <div className='authentication__window'>
          <div className='authentication__header'>Вход в личный кабинет</div>

          <form onSubmit={handleSubmit(onSubmit)} data-test-id='auth-form' className='authentication__form'>
            <div className='text-field text-field_floating-3'>
              <input
                type='text'
                id='login'
                name='identifier'
                placeholder='Логин'
                {...register('identifier', {
                  required: true,
                  onChange: (e) => validateIdentifier(e.target.value),
                  onBlur: (e) => validateIdentifier(e.target.value),
                })}
                className={classNames('authentication__input_login', {
                  authentication__error: authError === 400,
                })}
              />
              <label className='authentication__label_login' htmlFor='login'>
                Логин
              </label>
              {identifierError}
            </div>

            <div className='text-field text-field_floating-3 eye'>
              <input
                type={isShowPassword ? 'text' : 'password'}
                id='password'
                name='password'
                placeholder='Пароль'
                {...register('password', {
                  required: true,
                  onChange: (e) => validatePassword(e.target.value),
                  onBlur: (e) => validatePassword(e.target.value),
                })}
                className={classNames('authentication__input_password', {
                  authentication__error: authError === 400,
                })}
              />
              {isEye && (
                <input
                  type='img'
                  value=''
                  data-test-id={isShowPassword ? 'eye-opened' : 'eye-closed'}
                  className={classNames(
                    'authentication__input_eye',
                    {
                      'authentication__input_eye-opened': isShowPassword,
                    },
                    {
                      'authentication__input_eye-closed': !isShowPassword,
                    }
                  )}
                  onClick={() => setIsShowPassword(!isShowPassword)}
                />
              )}
              <label className='authentication__label_password' htmlFor='password'>
                Пароль
              </label>
              {passwordError}
            </div>

            {authError === 400 ? (
              <div className='authentication__text_recovery'>
                <span data-test-id='hint'>Неверный логин или пароль!</span>
                <Link className='authentication__link_recovery' to='/forgot-pass'>
                  Восстановить?
                </Link>
              </div>
            ) : (
              <div className='authentication__text_recovery'>
                <Link className='authentication__link_recovery' to='/forgot-pass'>
                  Забыли логин или пароль?
                </Link>
              </div>
            )}
            <button type='submit' className='authentication__button'>
              вход
            </button>
          </form>

          <div>
            <div className='authentication__text'>
              Нет учётной записи?
              <Link to='/registration' className='authentication__registration'>
                <span>Регистрация</span>
                <div className='registration__arrow' />
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

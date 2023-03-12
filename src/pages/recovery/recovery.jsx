import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import { Loader } from '../../app/components/loader/loader';
import { CannotBeEmpty } from '../../app/components/messages/cannot-be-empty/cannot-be-empty';
import { getMessage } from '../../store/actions/actions';
import { fetchRecovery } from '../../store/actions/recovery-actions';
import { ResetPassword } from '../reset-password/reset-password';

import './recovery.css';

export const Recovery = () => {
  const [emailError, setEmailError] = useState('');
  const isRecovery = useSelector((state) => state.recovery.isRecovery);
  const recovery = useSelector((state) => state.recovery.recovery);
  const recoveryError = useSelector((state) => state.recovery.recoveryError);
  const [sendEmailSuccess, setSendEmailSuccess] = useState(recovery);
  const [searchParams] = useSearchParams();
  const token = localStorage.getItem('token');
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/books/all');
    }
  }, [navigate, token]);

  useEffect(() => {
    if (searchParams.get('code')) {
      <ResetPassword />;
    }
  }, [searchParams]);

  useEffect(() => {
    if (recoveryError) {
      dispatch(getMessage('error'));
      setEmailError(<CannotBeEmpty />);
    }
  }, [dispatch, recoveryError]);

  useEffect(() => {
    setSendEmailSuccess(recovery);
  }, [recovery]);

  const onSubmit = (data) => {
    dispatch(fetchRecovery(data.email));
  };

  const validateEmail = (data) => {
    if (!/([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}/.test(data)) {
      dispatch(getMessage('Введите корректный e-mail'));
      setEmailError(<CannotBeEmpty />);
    }
  };

  const checkEmail = (data) => {
    if (data.trim()) {
      validateEmail(data);
    } else {
      dispatch(getMessage('Поле не может быть пустым'));
      setEmailError(<CannotBeEmpty />);
    }
  };

  return (
    <section className='recovery' data-test-id='auth'>
      {isRecovery && <Loader />}
      <div className='recovery__logo'>Cleverland</div>

      {searchParams.get('code') ? (
        <ResetPassword code={searchParams.get('code')} />
      ) : sendEmailSuccess === 200 ? (
        <div className='authentication__window_error'>
          <div className='authentication__header_error' data-test-id='status-block'>
            Письмо выслано
          </div>

          <form>
            <span className='recovery__text_sand'>
              Перейдите в вашу почту, чтобы воспользоваться подсказками по восстановлению пароля
            </span>
          </form>
        </div>
      ) : (
        <div className='recovery__window'>
          <div className='recovery__link'>
            <Link to='/auth' className='recovery__link_login'>
              <div className='auth__arrow' />
              <span>вход в личный кабинет</span>
            </Link>
          </div>

          <div className='recovery__header'>Восстановление пароля</div>

          <form className='recovery__form' onSubmit={handleSubmit(onSubmit)} data-test-id='send-email-form'>
            <div className='text-field text-field_floating-3'>
              <input
                type='text'
                id='email'
                name='email'
                placeholder='E-mail'
                {...register('email', {
                  required: true,
                  onBlur: (e) => checkEmail(e.target.value),
                  onChange: (e) => checkEmail(e.target.value),
                })}
                className='recovery__input_login'
              />
              <label className='recovery__label_login' htmlFor='email'>
                E-mail
              </label>
            </div>
            {emailError}
            <div className='recovery__text_info'>
              На это email будет отправлено письмо с инструкциями по восстановлению пароля
            </div>

            <button type='submit' className='recovery__button'>
              восстановить
            </button>
          </form>
          <div className='recovery__text'>
            Нет учётной записи?
            <Link to='/registration' className='recovery__registration'>
              <span>Регистрация</span>
              <div className='registration__arrow' />
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

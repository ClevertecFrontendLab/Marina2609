import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Loader } from '../../app/components/loader/loader';
import { CannotBeEmpty } from '../../app/components/messages/cannot-be-empty/cannot-be-empty';
import { AppLayout } from '../../app/layouts/app-layout';
import { getMessage } from '../../store/actions/actions';
import { fetchRecovery } from '../../store/actions/recovery-actions';

import './recovery.css';

export const Recovery = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isError, setIsError] = useState(false);
  const isRecovery = useSelector((state) => state.recovery.isRecovery);
  const recovery = useSelector((state) => state.recovery.recovery);
  const recoveryError = useSelector((state) => state.recovery.recoveryError);
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const auth = { token: localStorage.getItem('token') };

  const onSubmit = () => {
    if (email.length === 0) {
      dispatch(getMessage('Поле не может быть пустым'));
      setEmailError(<CannotBeEmpty />);
    } else {
      setEmailError('');
    }

    if (email) {
      dispatch(fetchRecovery(email));
    }

    if (recoveryError.data.error.message) {
      dispatch(getMessage(recoveryError.data.error.message));
      setEmailError(<CannotBeEmpty />);
    } else {
      setEmailError('');
    }
  };

  const changeEmail = (event) => {
    event.preventDefault();

    setEmailError('');
    setEmail(event.target.value);
  };

  const shouldBlurEmail = (event) => {
    setEmail(event.target.value);

    const pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );

    if (event.target.value.length === 0) {
      dispatch(getMessage('Поле не может быть пустым'));
      setEmailError(<CannotBeEmpty />);
    } else if (!pattern.test(event.target.value)) {
      dispatch(getMessage('Введите корректный e-mail'));
      setEmailError(<CannotBeEmpty />);
    } else {
      setEmailError('');
    }
  };

  return auth.token ? (
    <AppLayout />
  ) : (
    <section className='recovery' data-test-id='auth'>
      {isRecovery && <Loader />}
      <div className='recovery__logo'>Cleverland</div>

      {recovery === 200 ? (
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
              <div className='authentication__arrow' />
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
                placeholder='Email'
                {...register('email')}
                onChange={changeEmail}
                onBlur={shouldBlurEmail}
                className='recovery__input_login'
              />
              <label className='recovery__label_login' htmlFor='login'>
                Email
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

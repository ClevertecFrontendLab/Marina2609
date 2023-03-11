import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import { Loader } from '../../app/components/loader/loader';
import { CannotBeEmpty } from '../../app/components/messages/cannot-be-empty/cannot-be-empty';
import { getMessage } from '../../store/actions/actions';
import { fetchRecovery } from '../../store/actions/recovery-actions';

export const ResetPassword = () => {
  const [isPasswordSuccess, setIsPasswordSuccess] = useState(false);
  const recoveryError = useSelector((state) => state.recovery.recoveryError);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  const submitHandlerRepeat = () => {};

  const onSubmit = (data) => {};

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

      <form onSubmit={submitHandlerRepeat}>
        <span className='recovery__text_sand'>Что-то пошло не так. Попробуйте ещё раз</span>
        <button type='submit' className='recovery__button'>
          повторить
        </button>
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

      <form className='recovery__form' onSubmit={handleSubmit(onSubmit)} data-test-id='reset-password-form'>
        <div className='text-field text-field_floating-3'>
          {/* <input
                type='text'
                id='email'
                name='email'
                placeholder='Email'
                {...register('email', {
                  required: true,
                  onChange: (e) => checkEmail(e.target.value),
                  onBlur: (e) => checkEmail(e.target.value),
                })}
                className='recovery__input_login'
              />
              <label className='recovery__label_login' htmlFor='login'>
                Email
              </label> */}
        </div>
        {/* {emailError} */}
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
  );
};

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import VerificationInput from 'react-verification-input';
import { push } from 'redux-first-history';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { ConfirmEmailAsync, ConfirmEmailError } from '../../store/reducers/ConfirmEmailSlice';
import { Email } from '../../store/reducers/EmailSlice';
import { Danger } from '../../assets/images/svg/Danger';
import { Suggested } from '../../assets/images/svg/Suggested';
import './ConfirmEmailPage.css';

export const ConfirmEmailPage = () => {
    const [verification, setVerification] = useState('');
    const location = useLocation();
    const dispatch = useAppDispatch();

    const email = useAppSelector(Email);
    const emailError = useAppSelector(ConfirmEmailError);

    const handleVerification = (code: string) => {
        dispatch(ConfirmEmailAsync({ email, code }));
    };

    useEffect(() => {
        emailError && setVerification('');
    }, [emailError]);

    useEffect(() => {
        const isAccess = !location.state || !location.state.fromServer;

        if (isAccess) {
            dispatch(push('/auth'));
        }
    }, [dispatch, location.state]);

    return (
        <div className='error-confirm-email-container'>
            <div className='error-confirm-email-content'>
                {emailError ? <Danger /> : <Suggested />}
                <div className='error-confirm-email-info'>
                    <h1>
                        {emailError ? 'Неверный код.' : ''} Введите код <br /> для восстановления
                        аккауанта
                    </h1>
                    <h3>
                        Мы отправили вам на e-mail <b>{email}</b> шестизначный код. Введите его в
                        поле ниже.
                    </h3>
                </div>
                <div data-test-id='verification-input'>
                    <VerificationInput
                        data-test-id='verification-input'
                        classNames={{
                            characterInactive: 'character-inactive',
                            character: emailError ? 'character-error' : 'character',
                        }}
                        placeholder=''
                        value={verification}
                        onChange={setVerification}
                        onComplete={handleVerification}
                    />
                </div>
                <h3>Не пришло письмо? Проверьте папку Спам.</h3>
            </div>
        </div>
    );
};

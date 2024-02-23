import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import VerificationInput from 'react-verification-input';
import { push } from 'redux-first-history';
import { useAppDispatch, useAppSelector } from '../../hooks';
import './ConfirmEmailPage.css';
import { ConfirmEmailAsync } from '../../store/reducers/ConfirmEmailSlice';
import { Email, EmailError } from '../../store/reducers/EmailSlice';
import { Danger } from '../../assets/images/svg/Danger';
import { Suggested } from '../../assets/images/svg/Suggested';

export const ConfirmEmailPage = () => {
    const [verification, setVerification] = useState('');
    const dispatch = useAppDispatch();
    const location = useLocation();

    const email = useAppSelector(Email);
    const emailError = useAppSelector(EmailError);

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
        <div className='error confirm-email-container'>
            {emailError ? <Danger /> : <Suggested />}
            <div className='confirm-email'>
                <h1>
                    {emailError ? 'Неверный код.' : ''} Введите код для восстановления аккауанта
                </h1>
                <h3>
                    Мы отправили вам на e-mail <b>{email}</b> шестизначный код. Введите его в поле
                    ниже.
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
    );
};

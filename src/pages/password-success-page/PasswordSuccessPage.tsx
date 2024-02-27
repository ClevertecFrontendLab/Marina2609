import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { Success } from '../../assets/images/svg/Success';
import './PasswordSuccessPage.css';

export const PasswordSuccessPage = () => {
    const navigate = useNavigate();
    return (
        <div className='password-success-container'>
            <div className='password-success-content'>
                <Success />
                <div className='password-success-info'>
                    <h1>Пароль успешно изменен</h1>
                    <h3>Теперь можно войти в аккаунт, используя свой логин и новый пароль</h3>
                </div>
                <Button
                    data-test-id='change-entry-button'
                    type='primary'
                    onClick={() => navigate('/auth')}
                >
                    Войти
                </Button>
            </div>
        </div>
    );
};

import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { Success } from '../../assets/images/svg/Success';
import './RegistrationSuccessPage.css';

export const RegistrationSuccessPage = () => {
    const navigate = useNavigate();
    return (
        <div className='registration-success-container'>
            <div className='registration-success-content'>
                <Success />
                <div className='registration-success-info'>
                    <h1>Регистрация успешна</h1>
                    <h3>
                        Регистрация прошла успешно. Зайдите <br /> в приложение, используя свои
                        e-mail и пароль.
                    </h3>
                </div>
                <Button
                    data-test-id='registration-enter-button'
                    type='primary'
                    onClick={() => navigate('/auth')}
                >
                    Войти
                </Button>
            </div>
        </div>
    );
};

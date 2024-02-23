import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { Danger } from '../../assets/images/svg/Danger';
import './ErrorRegistrationPage.css';

export const ErrorRegistrationPage = () => {
    const navigate = useNavigate();
    return (
        <div className='error-registration-container'>
            <Danger />
            <div className='error-registration-info'>
                <h1>Данные не сохранились</h1>
                <h3>Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз.</h3>
            </div>
            <Button
                data-test-id='registration-retry-button'
                type='primary'
                onClick={() => navigate('/auth/registration')}
            >
                Повторить
            </Button>
        </div>
    );
};

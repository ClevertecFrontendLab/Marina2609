import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { Danger } from '../../assets/images/svg/Danger';
import './ErrorPasswordPage.css';

export const ErrorPasswordPage = () => {
    const navigate = useNavigate();
    return (
        <div className='error-password-container'>
            <div className='error-password-content'>
                <Danger />
                <div className='error-password-info'>
                    <h1>Данные не сохранились</h1>
                    <h3>Что-то пошло не так. Попробуйте ещё раз.</h3>
                </div>
                <Button
                    data-test-id='change-retry-button'
                    type='primary'
                    onClick={() => navigate('/auth/change-password')}
                >
                    Повторить
                </Button>
            </div>
        </div>
    );
};

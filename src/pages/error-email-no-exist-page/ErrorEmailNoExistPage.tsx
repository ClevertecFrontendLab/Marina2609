import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { Danger } from '../../assets/images/svg/Danger';
import './ErrorEmailNoExistPage.css';

export const ErrorEmailNoExistPage = () => {
    const navigate = useNavigate();

    return (
        <div className='error-email-no-exist-container'>
            <div className='error-email-no-exist-content'>
                <Danger />
                <div className='error-email-no-exist-info'>
                    <h1>Такой e-mail не зарегистрирован</h1>
                    <h3>Мы не нашли в базе вашего e-mail. Попробуйте войти с другим e-mail.</h3>
                </div>
                <Button
                    data-test-id='check-retry-button'
                    type='primary'
                    onClick={() => navigate('/auth')}
                >
                    Попробовать снова
                </Button>
            </div>
        </div>
    );
};

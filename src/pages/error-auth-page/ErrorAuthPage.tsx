import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { Warning } from '../../assets/images/svg/Warning';
import './ErrorAuthPage.css';

export const ErrorAuthPage = () => {
    const navigate = useNavigate();

    return (
        <div className='error-auth-container'>
            <div className='error-auth-content'>
                <Warning />
                <div className='error-auth-info'>
                    <h1>Вход не выполнен</h1>
                    <h3>Что-то пошло не так. Попробуйте еще раз</h3>
                </div>
                <Button
                    data-test-id='login-retry-button'
                    type='primary'
                    onClick={() => navigate('/auth')}
                >
                    Повторить
                </Button>
            </div>
        </div>
    );
};

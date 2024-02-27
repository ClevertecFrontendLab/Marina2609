import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { Wrong } from '../../assets/images/svg/Wrong';
import './ErrorEmailPage.css';

export const ErrorEmailPage = () => {
    const navigate = useNavigate();

    return (
        <div className='error-email-container'>
            <div className='error-email-content'>
                <Wrong />
                <div className='error-email-info'>
                    <h1>Что-то пошло не так</h1>
                    <h3>Произошла ошибка, попробуйте отправить форму ещё раз.</h3>
                </div>
                <Button
                    data-test-id='check-back-button'
                    type='primary'
                    onClick={() => navigate('/auth')}
                >
                    Назад
                </Button>
            </div>
        </div>
    );
};

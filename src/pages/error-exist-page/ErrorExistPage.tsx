import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { Danger } from '../../assets/images/svg/Danger';
import './ErrorExistPage.css';

export const ErrorExistPage = () => {
    const navigate = useNavigate();
    return (
        <div className='error-exist-container'>
            <div className='error-exist-content'>
                <Danger />
                <div className='error-exist-info'>
                    <h1>Данные не сохpанились</h1>
                    <h3>
                        Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому
                        e-mail.
                    </h3>
                </div>
                <Button
                    data-test-id='registration-back-button'
                    type='primary'
                    onClick={() => navigate('/auth/registration')}
                >
                    Назад к регистрации
                </Button>
            </div>
        </div>
    );
};

import { useEffect } from 'react';
import { Button, Grid, Row } from 'antd';
import { GooglePlusOutlined } from '@ant-design/icons';
import { SubmitProps } from '../../types';
import './Submit.css';

const { useBreakpoint } = Grid;

export const Submit = ({ isEmailTouched, setIsEmailTouched, isSubmitDisabled }: SubmitProps) => {
    const registrationPage = location.pathname.includes('/registration');
    const breakpoints = useBreakpoint();

    return (
        <Row className='btns-container'>
            <Button
                data-test-id={
                    registrationPage ? 'registration-submit-button' : 'login-submit-button'
                }
                className={registrationPage ? 'registration-submit-button' : 'login-submit-button'}
                type='primary'
                htmlType='submit'
                disabled={isSubmitDisabled}
                onClick={() => setIsEmailTouched(true)}
            >
                Войти
            </Button>
            <Button type='default' className='google__btn'>
                <GooglePlusOutlined style={{ display: breakpoints.xs ? 'none' : 'inline-block' }} />
                {registrationPage ? 'Регистрация' : 'Войти'} через Google
            </Button>
        </Row>
    );
};

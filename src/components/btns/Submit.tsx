import { useEffect } from 'react';
import { Button, Grid, Row } from 'antd';
import { GooglePlusOutlined } from '@ant-design/icons';
import { SubmitProps } from '../../types';
import './Submit.css';

const { useBreakpoint } = Grid;

export const Submit = ({ setIsEmailTouched, isSubmitDisabled }: SubmitProps) => {
    const registrationPage = location.pathname.includes('/registration');
    const breakpoints = useBreakpoint();

    useEffect(() => {
        // const newMargin = registrationPage ? '0px' : breakpoints.xs ? '92px' : '110px';
        // setMargin(newMargin);
    }, [breakpoints, isSubmitDisabled, registrationPage]);

    return (
        <Row
            className='btns-container'
            // justify={'center'} style={{ marginBottom: margin }}
        >
            <Button
                data-test-id={
                    registrationPage ? 'registration-submit-button' : 'login-submit-button'
                }
                type='primary'
                htmlType='submit'
                disabled={isSubmitDisabled}
                style={
                    isSubmitDisabled
                        ? {}
                        : {
                              background: '#2F54EBFF',
                              border: '1px solid #2F54EBFF',
                              color: '#fff',
                          }
                }
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

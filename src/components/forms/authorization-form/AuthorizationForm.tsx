import React, { useEffect, useState } from 'react';
import { Form, Input, Checkbox, Row, Button } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { useAppDispatch, useAppSelector } from '../../../hooks/TypedReactReduxHooks';
import { Submit } from '../..';
import { EmailAsync, EmailError } from '../../../store/reducers/EmailSlice';
import { AuthForm } from '../../../types';
import { AuthAsync } from '../../../store/reducers/AuthSlice';
import './AuthorizationForm.css';

export const AuthorizationForm = () => {
    const [form] = Form.useForm();
    const [email, setEmail] = useState<string>(() => {
        const storedEmail = sessionStorage.getItem('email');
        return storedEmail
            ? JSON.parse(storedEmail)
            : {
                  email: '',
              };
    });
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isEmailTouched, setIsEmailTouched] = useState(false);
    const [passVisible, setPassVisible] = useState(false);
    const [isPassDisabled, setIsPassDisabled] = useState(false);
    const [isRemember, setIsRemember] = useState(false);
    const dispatch = useAppDispatch();

    const emailError = useAppSelector(EmailError);

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const email = e.target.value;
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        setIsEmailValid(isEmailValid);
        setIsPassDisabled(!isEmailValid);
        setIsEmailTouched(true);
    };

    const onChange = (e: CheckboxChangeEvent) => {
        setIsRemember(e.target.checked);
    };

    const onFinish = async (values: AuthForm) => {
        dispatch(AuthAsync(values));
    };

    useEffect(() => {
        if (
            emailError &&
            !(emailError.statusCode === 404 && emailError.message === 'Email не найден')
        ) {
            sessionStorage.setItem('email', JSON.stringify(email));
            dispatch(EmailAsync(email));
        } else {
            sessionStorage.removeItem('email');
        }
    }, [emailError]);

    useEffect(() => {
        if (isRemember == false) {
            const cleanup = () => {
                if (performance.navigation.type === 1) {
                    sessionStorage.removeItem('accessToken');
                }
            };

            return cleanup;
        }
    }, [isRemember]);

    return (
        <Form className='authorization-container' layout='vertical' onFinish={onFinish} form={form}>
            <Form.Item
                name='email'
                rules={[{ required: true }, { type: 'email' }]}
                help={false}
                validateStatus={!isEmailValid && isEmailTouched ? 'error' : ''}
            >
                <Input
                    addonBefore='e-mail:'
                    value={email}
                    data-test-id='login-email'
                    onChange={(e) => {
                        handleEmail(e);
                        const trimmedValue = e.target.value.trim();
                        setEmail(trimmedValue);
                    }}
                />
            </Form.Item>
            <Form.Item
                name='password'
                rules={[
                    { required: true, message: '' },
                    { min: 8, message: '' },
                    {
                        validator: (_, value) =>
                            value && value.match(/^(?=.*[A-Z])(?=.*\d).{8,}$/)
                                ? Promise.resolve()
                                : Promise.reject(
                                      new Error(
                                          'Пароль не менее 8 символов, с заглавной буквой и цифрой',
                                      ),
                                  ),
                    },
                ]}
            >
                <Input.Password
                    placeholder='Пароль'
                    data-test-id='login-password'
                    visibilityToggle={{
                        visible: passVisible,
                        onVisibleChange: setPassVisible,
                    }}
                    style={
                        passVisible && form.getFieldError('password')?.length === 0
                            ? { borderColor: '#d9d9d9' }
                            : { borderColor: '' }
                    }
                    iconRender={(visible) =>
                        visible ? (
                            <EyeOutlined
                                style={
                                    form.getFieldError('password')?.length === 0
                                        ? { color: '#597EF7FF' }
                                        : { color: '' }
                                }
                            />
                        ) : (
                            <EyeInvisibleOutlined />
                        )
                    }
                />
            </Form.Item>
            <Row className='authorization-actions'>
                <Form.Item
                    className='remember-me'
                    name='rememberMe'
                    initialValue={true}
                    valuePropName='checked'
                >
                    <Checkbox data-test-id='login-remember' onChange={onChange}>
                        Запомнить меня
                    </Checkbox>
                </Form.Item>
                <Button
                    className='password__btn'
                    data-test-id='login-forgot-button'
                    type='link'
                    disabled={isPassDisabled}
                    style={{
                        color: !isPassDisabled ? 'rgb(47,84,235)' : 'rgba(0, 0, 0, 0.25)',
                    }}
                    onClick={() => {
                        if (isEmailValid) {
                            dispatch(EmailAsync(form.getFieldValue('email')));
                        } else {
                            setIsEmailTouched(true);
                        }
                    }}
                >
                    Забыли пароль?
                </Button>
            </Row>
            <Form.Item shouldUpdate className='authorization__btns'>
                {() => (
                    <Submit
                        isEmailTouched={isEmailTouched}
                        setIsEmailTouched={setIsEmailTouched}
                        isSubmitDisabled={false}
                    />
                )}
            </Form.Item>
        </Form>
    );
};

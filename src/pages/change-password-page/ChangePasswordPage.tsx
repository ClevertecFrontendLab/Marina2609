import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { push } from 'redux-first-history';
import { Button, Form, Input } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { ChangePasswordValues } from '../../types';
import './ChangePasswordPage.css';
import { ChangePasswordAsync, ChangePasswordError } from '../../store/reducers/ChangePasswordSlice';

export const ChangePasswordPage = () => {
    const [form] = Form.useForm();
    const location = useLocation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const isDirectAccess = !location.state || !location.state.fromServer;

        if (isDirectAccess) {
            dispatch(push('/auth'));
        }
    }, [dispatch, location.state]);

    const [formValues, setFormValues] = useState<ChangePasswordValues>(() => {
        const storedFormValues = sessionStorage.getItem('formValues');
        return storedFormValues
            ? JSON.parse(storedFormValues)
            : {
                  changePassword: '',
                  changeConfirmPassword: '',
              };
    });

    const [changePasswordVisible, setChangePasswordVisible] = useState(false);
    const [changeConfirmPasswordVisible, setChangeConfirmPasswordVisible] = useState(false);

    const changePasswordError = useAppSelector(ChangePasswordError);

    useEffect(() => {
        if (changePasswordError) {
            sessionStorage.setItem('formValues', JSON.stringify(formValues));
            onFinish(formValues);
        } else {
            sessionStorage.removeItem('formValues');
        }
    }, [changePasswordError]);

    const onFinish = async (values: ChangePasswordValues) => {
        const { changePassword, changeConfirmPassword } = values;

        const selectedValues = {
            password: changePassword,
            confirmPassword: changeConfirmPassword,
        };

        dispatch(ChangePasswordAsync(selectedValues));
    };

    return (
        <Form
            layout='vertical'
            form={form}
            onFinish={onFinish}
            className='change-password-container'
        >
            <h1>Восстановление аккауанта</h1>
            <Form.Item
                name={'changePassword'}
                rules={[
                    { required: true },
                    { min: 8 },
                    {
                        validator: (_, value) =>
                            value && value.match(/^(?=.*[A-Z])(?=.*\d).{8,}$/)
                                ? Promise.resolve()
                                : Promise.reject(new Error('')),
                    },
                ]}
                help={'Пароль не менее 8 символов, с заглавной буквой и цифрой'}
            >
                <Input.Password
                    data-test-id='change-password'
                    placeholder='Новый пароль'
                    visibilityToggle={{
                        visible: changePasswordVisible,
                        onVisibleChange: setChangePasswordVisible,
                    }}
                    style={
                        changePasswordVisible && form.getFieldError('changePassword')?.length === 0
                            ? { borderColor: '#597EF7FF' }
                            : { borderColor: '' }
                    }
                    value={formValues.changePassword}
                    onChange={(e) => {
                        const trimmedValue = e.target.value.trim();
                        setFormValues({ ...formValues, changePassword: trimmedValue });
                    }}
                    iconRender={(visible) =>
                        visible ? (
                            <EyeOutlined
                                style={
                                    form.getFieldError('changePassword')?.length === 0
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

            <Form.Item
                data-test-id='change-confirm-password'
                name='changeConfirmPassword'
                dependencies={['changePassword']}
                rules={[
                    { required: true, message: '' },
                    { min: 8, message: '' },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('changePassword') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Пароли не совпадают'));
                        },
                    }),
                ]}
            >
                <Input.Password
                    placeholder='Повторите пароль'
                    visibilityToggle={{
                        visible: changeConfirmPasswordVisible,
                        onVisibleChange: setChangeConfirmPasswordVisible,
                    }}
                    style={
                        changeConfirmPasswordVisible &&
                        form.getFieldError('changeConfirmPassword')?.length === 0
                            ? { borderColor: '#597EF7FF' }
                            : { borderColor: '' }
                    }
                    value={formValues.changeConfirmPassword}
                    onChange={(e) => {
                        const trimmedValue = e.target.value.trim();
                        setFormValues({ ...formValues, changeConfirmPassword: trimmedValue });
                    }}
                    iconRender={(visible) =>
                        visible ? (
                            <EyeOutlined
                                style={
                                    form.getFieldError('changeConfirmPassword')?.length === 0
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

            <Form.Item shouldUpdate>
                {() => (
                    <Button
                        data-test-id='change-submit-button'
                        type='primary'
                        htmlType='submit'
                        disabled={
                            !form.isFieldsTouched(true) ||
                            !!form.getFieldsError().filter(({ errors }) => errors.length).length
                        }
                        style={
                            !form.isFieldsTouched(true) ||
                            !!form.getFieldsError().filter(({ errors }) => errors.length).length
                                ? {}
                                : {
                                      border: '1px solid #2F54EBFF',
                                      background: '#2F54EBFF',
                                      color: '#FFFFFFFF',
                                  }
                        }
                    >
                        Сохранить
                    </Button>
                )}
            </Form.Item>
        </Form>
    );
};

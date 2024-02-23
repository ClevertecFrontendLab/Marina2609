import { useEffect, useState } from 'react';
import { Form, Input } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { RegistForm } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../hooks/TypedReactReduxHooks';
import './RegistrationForm.css';
import { Submit } from '@components/btns/Submit';
import { RegistAsync, RegistError } from '../../../store/reducers/RegistSlice';

export const RegistrationForm = () => {
    const [form] = Form.useForm();
    const [password, setPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState(false);
    const [formValues, setFormValues] = useState<RegistForm>(() => {
        const storedFormValues = sessionStorage.getItem('formValues');
        return storedFormValues
            ? JSON.parse(storedFormValues)
            : {
                  email: '',
                  password: '',
                  confirmPassword: '',
              };
    });
    const dispatch = useAppDispatch();
    const registrationError = useAppSelector(RegistError);

    const onFinish = async (values: RegistForm) => {
        const { email, password } = values;

        const selectedValues = {
            email: email,
            password: password,
        };

        dispatch(RegistAsync(selectedValues));
    };

    useEffect(() => {
        if (registrationError && registrationError?.statusCode !== 409) {
            sessionStorage.setItem('formValues', JSON.stringify(formValues));
            onFinish(formValues);
        } else {
            sessionStorage.removeItem('formValues');
        }
    }, [registrationError]);

    return (
        <Form
            layout='vertical'
            form={form}
            onFinish={onFinish}
            className='registration-container'
            initialValues={formValues}
        >
            <Form.Item
                name='registerEmail'
                rules={[{ required: true }, { type: 'email' }]}
                help={false}
            >
                <Input
                    data-test-id='registration-email'
                    name='Email'
                    addonBefore='e-mail:'
                    value={formValues.email}
                    onChange={(e) => {
                        const trimmedValue = e.target.value.trim();
                        setFormValues({ ...formValues, email: trimmedValue });
                    }}
                />
            </Form.Item>

            <Form.Item
                name={'registerPassword'}
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
                className='password'
            >
                <Input.Password
                    data-test-id='registration-password'
                    placeholder='Пароль'
                    visibilityToggle={{
                        visible: password,
                        onVisibleChange: setPassword,
                    }}
                    style={
                        password && form.getFieldError('registerPassword')?.length === 0
                            ? { borderColor: '#597EF7FF' }
                            : { borderColor: '' }
                    }
                    value={formValues.password}
                    onChange={(e) => {
                        const trimmedValue = e.target.value.trim();
                        setFormValues({ ...formValues, password: trimmedValue });
                    }}
                    iconRender={(visible) =>
                        visible ? (
                            <EyeOutlined
                                style={
                                    form.getFieldError('registerPassword')?.length === 0
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
                data-test-id='registration-confirm-password'
                name='confirmPassword'
                dependencies={['registerPassword']}
                rules={[
                    { required: true, message: '' },
                    { min: 8, message: '' },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('registerPassword') === value) {
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
                        visible: confirmPassword,
                        onVisibleChange: setConfirmPassword,
                    }}
                    style={
                        confirmPassword && form.getFieldError('confirmPassword')?.length === 0
                            ? { borderColor: '#597EF7FF' }
                            : { borderColor: '' }
                    }
                    value={formValues.confirmPassword}
                    onChange={(e) => {
                        const trimmedValue = e.target.value.trim();
                        setFormValues({ ...formValues, confirmPassword: trimmedValue });
                    }}
                    iconRender={(visible) =>
                        visible ? (
                            <EyeOutlined
                                style={
                                    form.getFieldError('confirmPassword')?.length === 0
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
                    <Submit
                        isSubmitDisabled={
                            !form.isFieldsTouched(true) ||
                            !!form.getFieldsError().filter(({ errors }) => errors.length).length
                        }
                        setIsEmailTouched={() => null}
                    />
                )}
            </Form.Item>
        </Form>
    );
};

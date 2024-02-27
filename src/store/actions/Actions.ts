import { AxiosError } from 'axios';
import { Api } from '../../api/index';
import { Confirm, PasswordData, RegistValues } from '../../types';

export interface Error {
    statusCode: number;
    error: string;
    message: string;
}

export const FetchEmail = async (email: string) => {
    try {
        const response = await Api.post('/auth/check-email', { email });
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        const customError: Error = {
            statusCode: axiosError?.response?.status || 500,
            error: axiosError?.response?.statusText || 'Internal Server Error',
            message: axiosError?.response?.data?.message || 'Check email failed',
        };
        throw customError;
    }
};

export const FetchLogin = async (credentials: { email: string; password: string }) => {
    try {
        const response = await Api.post('/auth/login', credentials);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        const customError: Error = {
            statusCode: axiosError?.response?.status || 500,
            error: axiosError?.response?.statusText || 'Internal Server Error',
            message: axiosError?.response?.data?.message || 'Login failed',
        };
        throw customError;
    }
};

export const FetchRegistration = async (userData: RegistValues) => {
    try {
        const response = await Api.post('/auth/registration', userData);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        const customError: Error = {
            statusCode: axiosError?.response?.status || 500,
            error: axiosError?.response?.statusText || 'Internal Server Error',
            message: axiosError?.response?.data?.message || 'Registration failed',
        };
        throw customError;
    }
};

export const FetchConfirmEmail = async (credentials: Confirm) => {
    try {
        const response = await Api.post('/auth/confirm-email', credentials);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        const customError: Error = {
            statusCode: axiosError?.response?.status || 500,
            error: axiosError?.response?.statusText || 'Internal Server Error',
            message: axiosError?.response?.data?.message || 'Confirmation failed',
        };
        throw customError;
    }
};

export const FetchChangePassword = async (passwordData: PasswordData) => {
    try {
        const response = await Api.post('/auth/change-password', passwordData);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        const customError: Error = {
            statusCode: axiosError?.response?.status || 500,
            error: axiosError?.response?.statusText || 'Internal Server Error',
            message: axiosError?.response?.data?.message || 'Change password failed',
        };
        throw customError;
    }
};

import { LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS } from '../actions/actions-types';

const initialState = {
  isAuth: false,
  auth: [],
  authError: '',
};

export const login = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_REQUEST:
      return { ...state, isAuth: true, authError: '' };

    case LOGIN_SUCCESS:
      return { ...state, isAuth: false, auth: payload, authError: '' };

    case LOGIN_FAILED:
      return { ...state, isAuth: false, auth: [], authError: payload };

    default:
      return state;
  }
};

export const fetchLoginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const fetchLoginSuccess = (login) => ({
  type: LOGIN_SUCCESS,
  payload: login,
});

export const fetchLoginFailure = (error) => ({
  type: LOGIN_FAILED,
  payload: error,
});

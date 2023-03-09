import { LOGIN_FAILED, LOGIN_REQUEST, REGISTER_SUCCESS } from '../actions/actions-types';

const initialState = {
  isRegistr: false,
  register: [],
  registerError: '',
};

export const registr = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_REQUEST:
      return { ...state, isRegistr: true, registerError: '' };

    case REGISTER_SUCCESS:
      return { ...state, isRegistr: false, register: payload, registerError: '' };

    case LOGIN_FAILED:
      return { ...state, isRegistr: false, register: [], registerError: payload };

    default:
      return state;
  }
};

export const fetchRegistrRequest = () => ({
  type: LOGIN_REQUEST,
});

export const fetchRegistrSuccess = (register) => ({
  type: REGISTER_SUCCESS,
  payload: register,
});

export const fetchRegistrFailure = (error) => ({
  type: LOGIN_FAILED,
  payload: error,
});

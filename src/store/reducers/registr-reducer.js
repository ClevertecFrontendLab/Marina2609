import { REGISTER_FAILED, REGISTER_REQUEST, REGISTER_SUCCESS } from '../actions/actions-types';

const initialState = {
  isRegistr: false,
  registr: [],
  registerError: '',
};

export const registr = (state = initialState, { type, payload }) => {
  switch (type) {
    case REGISTER_REQUEST:
      return { ...state, isRegistr: true, registerError: '' };

    case REGISTER_SUCCESS:
      return { ...state, isRegistr: false, registr: payload, registerError: '' };

    case REGISTER_FAILED:
      return { ...state, isRegistr: false, registr: [], registerError: payload };

    default:
      return state;
  }
};

export const fetchRegistrRequest = () => ({
  type: REGISTER_REQUEST,
});

export const fetchRegistrSuccess = (registr) => ({
  type: REGISTER_SUCCESS,
  payload: registr,
});

export const fetchRegistrFailure = (error) => ({
  type: REGISTER_FAILED,
  payload: error,
});

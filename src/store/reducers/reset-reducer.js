import { RESET_PASSWORD } from '../actions/actions-types';

const initialState = {
  isPasswordSuccess: false,
};

export const reset = (state = initialState, { type, payload }) => {
  switch (type) {
    case RESET_PASSWORD:
      return { ...state, isRecovery: false, recovery: [], recoveryError: payload };

    default:
      return state;
  }
};

export const fetchRecoveryFailure = (reset) => ({
  type: RESET_PASSWORD,
  payload: reset,
});

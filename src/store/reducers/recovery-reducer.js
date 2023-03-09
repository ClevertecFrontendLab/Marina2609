import { RECOVERY_FAILED, RECOVERY_REQUEST, RECOVERY_SUCCESS } from '../actions/actions-types';

const initialState = {
  isRecovery: false,
  recovery: [],
  recoveryError: '',
};

export const recovery = (state = initialState, { type, payload }) => {
  switch (type) {
    case RECOVERY_REQUEST:
      return { ...state, isRecovery: true, recoveryError: '' };

    case RECOVERY_SUCCESS:
      return { ...state, isRecovery: false, recovery: payload, recoveryError: '' };

    case RECOVERY_FAILED:
      return { ...state, isRecovery: false, recovery: [], recoveryError: payload };

    default:
      return state;
  }
};

export const fetchRecoveryRequest = () => ({
  type: RECOVERY_REQUEST,
});

export const fetchRecoverySuccess = (recovery) => ({
  type: RECOVERY_SUCCESS,
  payload: recovery,
});

export const fetchRecoveryFailure = (error) => ({
  type: RECOVERY_FAILED,
  payload: error,
});

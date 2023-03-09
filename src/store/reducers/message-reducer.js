import { MESSAGE } from '../actions/actions-types';

const initialState = {
  message: [],
};

export const message = (state = initialState, { type, payload }) => {
  switch (type) {
    case MESSAGE:
      return { ...state, message: payload };

    default:
      return state;
  }
};

export const fetchMessage = (mes) => ({
  type: MESSAGE,
  payload: mes,
});

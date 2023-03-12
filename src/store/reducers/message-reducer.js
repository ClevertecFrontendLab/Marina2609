import { MESSAGE, MESSAGE2 } from '../actions/actions-types';

const initialState = {
  message: [],
  message2: [],
};

export const message = (state = initialState, { type, payload }) => {
  switch (type) {
    case MESSAGE:
      return { ...state, message: payload };

    case MESSAGE2:
      return { ...state, message2: payload };

    default:
      return state;
  }
};

export const fetchMessage = (mes) => ({
  type: MESSAGE,
  payload: mes,
});

export const fetchMessage2 = (mes2) => ({
  type: MESSAGE2,
  payload: mes2,
});

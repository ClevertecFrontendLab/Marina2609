import axios from 'axios';

import { baseUrl } from '../../api/api';
import { fetchLoginFailure, fetchLoginRequest, fetchLoginSuccess } from '../reducers/login-reducer';

export const fetchLogin = (identifier, password) => async (dispatch) => {
  dispatch(fetchLoginRequest(true));

  await axios
    .post(`${baseUrl}/api/auth/local`, { identifier, password })
    .then((response) => {
      localStorage.setItem('token', response.data.jwt);
      localStorage.setItem('user', response.data.user.firstName);

      dispatch(fetchLoginSuccess(response.data.jwt));
    })
    .catch((error) => {
      const { response } = error;

      dispatch(fetchLoginFailure(response.status));
    });
};

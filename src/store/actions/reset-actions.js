import { axiosInstance, baseUrl } from '../../api/api';
import { fetchRegistrFailure, fetchRegistrRequest, fetchRegistrSuccess } from '../reducers/registr-reducer';

export const fetchReset = (password, passwordConfirmation, code) => (dispatch) => {
  dispatch(fetchRegistrRequest(true));

  axiosInstance
    .post(`${baseUrl}/api/auth/reset-password`, { password, passwordConfirmation, code })
    .then((response) => {
      dispatch(fetchRegistrSuccess(response.status));
    })
    .catch((error) => {
      const { response } = error;

      dispatch(fetchRegistrFailure(response.status));
    });
};

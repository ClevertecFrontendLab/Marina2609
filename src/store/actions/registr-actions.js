import { axiosInstance, baseUrl } from '../../api/api';
import { fetchRegistrFailure, fetchRegistrRequest, fetchRegistrSuccess } from '../reducers/registr-reducer';

export const fetchRegistr = (email) => (dispatch) => {
  dispatch(fetchRegistrRequest(true));

  axiosInstance
    .post(`${baseUrl}/api/auth/forgot-password`, { email })
    .then((response) => {
      dispatch(fetchRegistrSuccess(response.status));
    })
    .catch((error) => {
      const { response } = error;

      dispatch(fetchRegistrFailure(response));
    });
};

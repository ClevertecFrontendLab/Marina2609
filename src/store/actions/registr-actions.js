import { axiosInstance, baseUrl } from '../../api/api';
import { fetchRegistrFailure, fetchRegistrRequest, fetchRegistrSuccess } from '../reducers/registr-reducer';

export const fetchRegistr = (email, username, password, firstName, lastName, phone) => (dispatch) => {
  dispatch(fetchRegistrRequest(true));

  axiosInstance
    .post(`${baseUrl}/api/auth/local/register`, { email, username, password, firstName, lastName, phone })
    .then((response) => {
      dispatch(fetchRegistrSuccess(response.status));
    })
    .catch((error) => {
      const { response } = error;

      dispatch(fetchRegistrFailure(response.status));
    });
};

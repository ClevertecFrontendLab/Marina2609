import { axiosInstance, baseUrl } from '../../api/api';
import { fetchRecoveryFailure, fetchRecoveryRequest, fetchRecoverySuccess } from '../reducers/recovery-reducer';

export const fetchRecovery = (email) => (dispatch) => {
  dispatch(fetchRecoveryRequest(true));

  axiosInstance
    .post(`${baseUrl}/api/auth/forgot-password`, { email })
    .then((response) => {
      dispatch(fetchRecoverySuccess(response.status));
    })
    .catch((error) => {
      const { response } = error;

      dispatch(fetchRecoveryFailure(response));
    });
};

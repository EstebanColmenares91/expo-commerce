// Axios.
import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// Services.
import { getAuthKey } from 'modules/auth/services/token.service';

// Utils.
import { getValidationError } from 'core/utils/validation-errors';


export const initAxios = () => {
  axios.interceptors.request.use(async (request: InternalAxiosRequestConfig) => {
    const token = await getAuthKey();
    if (!token) return request;
    request.headers.Authorization = `Bearer ${token}`;
    request.headers['Content-Type'] = 'application/json';
    return request;
  });

  axios.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
      const errorMessage = getValidationError(error);
      return Promise.reject(errorMessage);
    },
  );
};

import axios from 'axios';
import Config from 'react-native-config';
import EncryptedStorage from 'react-native-encrypted-storage';
import {getUniqueId} from 'react-native-device-info';

import {store} from '@store/index';

const service = axios.create({
  baseURL: Config.API_BASE_URL,
  timeout: 60000,
});

service.interceptors.request.use(
  async (config: any) => {
    if (!store.getState().other.hasNetwork) {
      const controller = new AbortController();
      controller.abort();
    }

    let uniqueId = await getUniqueId();
    const token = await EncryptedStorage.getItem('auth-access-token');
    config.headers.Accept = 'application/json';
    config.headers['Device-Id'] = uniqueId;
    config.headers['App-Type'] = 'app';
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    const url = config.url;
    config.url = `${Config.API_BASE_URL}${url}`;
    return config;
  },
  (error: any) => {
    Promise.reject(error);
  },
);

service.interceptors.response.use(
  (response: any) => {
    return response;
  },
  async (error: any) => {
    if (
      (error?.response?.status === 403 &&
        error?.response?.data?.exc_type === 'PermissionError') ||
      (error?.response?.status === 401 &&
        error?.response?.data?.exc_type === 'AuthenticationError')
    ) {
      return Promise.reject({
        ...error.response,
        message: 'Unauthorized. Please login to continue.',
      });
    } else {
      return Promise.reject(error);
    }
  },
);

export default service;

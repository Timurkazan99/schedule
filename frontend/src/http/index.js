import axios from 'axios';
import {HOST, URI} from "../utils/const";

const $host = axios.create({
  baseURL: `${HOST}/${URI}`,
});

const $authHost = axios.create({
  baseURL: `${HOST}/${URI}`,
});

const authInterceptor = (config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`; // eslint-disable-line no-param-reassign
  return config;
};

$authHost.interceptors.request.use(authInterceptor);

export {
  $host,
  $authHost,
};

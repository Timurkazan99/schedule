import jwtDecode from 'jwt-decode';
import { $host, $authHost } from './index';

export const createUser = async (user) => {
  const { data } = await $authHost.post('api/user/', user);
  if (process.env.MODE === 'dev') {
    console.log(data);
  }
  return data;
};

export const updateUser = async (user) => {
  const { data } = await $authHost.put('api/user/', user);
  return data;
};

export const deleteUser = async (id) => {
  const { data } = await $authHost.delete(`api/user/?id=${id}`);
  return data;
};

export const login = async (email, password) => {
  const { data } = await $host.post('api/user/login', { email, password });
  localStorage.setItem('token', data.token);
  return jwtDecode(data.token);
};

export const check = async () => {
  const { data } = await $authHost.get('api/user/auth');
  localStorage.setItem('token', data.token);
  return jwtDecode(data.token);
};

export const forgotPassword = async (email) => {
  const { data } = await $host.post('api/user/forgot-password', { email });
  if (process.env.MODE === 'dev') {
    console.log(data);
  }
  return data;
};

export const resetPassword = async (id, token, password) => {
  const { data } = await $host.post(`api/user/reset-password/${id}/${token}`, { password });
  return data;
};

export const getUser = async (id) => {
  const { data } = await $authHost.get(`api/user?id=${id}`);
  return data;
};

export const setPushToken = async (token) => {
  const { data } = await $authHost.post('api/user/push', { token });
  return data;
};

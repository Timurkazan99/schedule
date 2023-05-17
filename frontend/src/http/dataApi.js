import { $authHost } from './index';

const fetchUsers = async () => {
  const { data } = await $authHost.get('/api/user/');
  return data;
};

const fetchShifts = async (startPeriod, endPeriod) => {
  const { data } = await $authHost.get(`/api/shift/?startPeriod=${startPeriod}&endPeriod=${endPeriod}`);
  return data;
};

const fetchTemplates = async () => {
  const { data } = await $authHost.get('/api/template/');
  return data;
};

const fetchLocation = async () => {
  const { data } = await $authHost.get('/api/location/');
  return data;
};

export {
  fetchUsers, fetchShifts, fetchLocation, fetchTemplates,
};

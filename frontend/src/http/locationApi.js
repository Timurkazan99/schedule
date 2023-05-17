import { $authHost } from './index';

export const createLocation = async (location) => {
  const { data } = await $authHost.post('/api/location/', location);
  return data;
};

export const updateLocation = async (location) => {
  const { data } = await $authHost.put('/api/location/', location);
  return data;
};

export const deleteLocation = async (id) => {
  const { data } = await $authHost.delete(`/api/location/?id=${id}`);
  return data;
};

import { $authHost } from './index';

export const createTemplate = async (template) => {
  const { data } = await $authHost.post('/api/template/', template);
  return data;
};

export const updateTemplate = async (template) => {
  const { data } = await $authHost.put('/api/template/', template);
  return data;
};

export const deleteTemplate = async (id) => {
  const { data } = await $authHost.delete(`/api/template/?id=${id}`);
  return data;
};

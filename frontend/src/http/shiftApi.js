import { $authHost } from './index';
import { getPeriod } from '../utils/dates';
import { HOST, URI } from '../utils/const';

export const createShift = async (shift) => {
  const { data } = await $authHost.post('api/shift/', shift);
  return data;
};

export const updateShift = async (shift) => {
  const { data } = await $authHost.put('api/shift/', shift);
  return data;
};

export const deleteShift = async (id) => {
  const { data } = await $authHost.delete(`api/shift/?id=${id}`);
  return data;
};

export const getMyShift = async (id) => {
  const { startPeriod, endPeriod } = getPeriod();
  const { data } = await $authHost.get(`api/shift/${id}?startPeriod=${startPeriod}&endPeriod=${endPeriod}`);
  return data;
};

export const getFile = async (startPeriod, endPeriod, location = null) => {
  const url = location
    ? `${HOST}/${URI}/api/shift/file?startPeriod=${startPeriod}&endPeriod=${endPeriod}&location=${location}`
    : `${HOST}/${URI}/api/shift/file?startPeriod=${startPeriod}&endPeriod=${endPeriod}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  if (response.status === 200) {
    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'schedule.xlsx';
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
};

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('shifts', file);
  const { data } = await $authHost.post('api/shift/upload', formData);

  return data;
};

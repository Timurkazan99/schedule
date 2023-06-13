import { $authHost } from './index';
import { getPeriod } from '../utils/dates';
import { HOST, URI } from '../utils/const';

export const getResult = async (startPeriod, endPeriod) => {
  const { data } = await $authHost.get(`/api/attendance/?startPeriod=${startPeriod}&endPeriod=${endPeriod}`);
  return data;
};

export const getUserResult = async (userId) => {
  const { startPeriod, endPeriod } = getPeriod();
  const { data } = await $authHost.get(`/api/attendance/${userId}?startPeriod=${startPeriod}&endPeriod=${endPeriod}`);
  return data[0];
};

export const getFile = async ({ startPeriod, endPeriod }) => {
  const response = await fetch(`${HOST}/${URI}/api/attendance/file?startPeriod=${startPeriod}&endPeriod=${endPeriod}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  if (response.status === 200) {
    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'attendance.xlsx';
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
};

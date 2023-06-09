export const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // Кол-во дней в каждом месяце
export const DAYS_NAMES = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

export const Month = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
};

export const HOST = process.env.REACT_APP_API_URL;
export const URI = process.env.REACT_APP_URI || '';
export const PROFILE_ROUTE = `/${URI}/profile`;
export const LOGIN_ROUTE = `/${URI}/login`;
export const LOCATION_ROUTE = `/${URI}/location`;
export const EMPLOYEES_ROUTE = `/${URI}/employees`;
export const ATTENDANCE_ROUTE = `/${URI}/attendance`;
export const FORGOT_PASSWORD_ROUTE = `/${URI}/forgot-password`;
export const RESET_PASSWORD_ROUTE = `/${URI}/reset-password`;
export const UPLOAD_ROUTE = `/${URI}/upload`;
export const SCHEDULE_ROUTE = `/${URI}/`;

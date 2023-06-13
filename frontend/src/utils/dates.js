import { DAYS_IN_MONTH, Month } from './const';

const locale = 'ru-RU';
const option = { year: 'numeric', day: 'numeric', month: 'numeric' };

export const toLocaleString = (date, option = { weekday: 'short', day: 'numeric', month: 'numeric' }) => new Date(date).toLocaleString(locale, option); // eslint-disable-line no-shadow

const isLeapYear = (year) => !((year % 4) || (!(year % 100) && (year % 400)));

export const getDate = (str) => str.split(',')[0];

export const getDateObj = (date) => ({
  day: date.getDate(),
  month: date.getMonth(),
  year: date.getFullYear(),
});

export const isDateGone = (date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dateString = getDate(date).split('.');
  const selectDate = new Date(dateString[2], dateString[1] - 1, dateString[0]);

  return today.getTime() > selectDate.getTime();
};

const getDaysInMonth = (date) => {
  const month = date.getMonth();
  const year = date.getFullYear();
  const daysInMonth = DAYS_IN_MONTH[month];

  if (isLeapYear(year) && (month === Month.February)) {
    return daysInMonth + 1;
  }
  return daysInMonth;
};

const getDayOfWeek = (date) => {
  const dayOfWeek = date.getDay();

  return dayOfWeek === 0 ? 6 : dayOfWeek - 1;
};

/* eslint-disable functional/no-let, functional/no-loop-statement */
export const getMonthDate = ({ year, month }) => {
  const result = [];
  const date = new Date(year, month);
  const daysInMonth = getDaysInMonth(date);

  let day = 1;

  for (let i = 0; i < daysInMonth; i += 1) {
    const [d, m, y] = toLocaleString(new Date(year, month, day), option).split('.');
    result[i] = `${y}.${m}.${d}`;
    day += 1;
  }

  return result;
};

export const getWeekDate = ({ year, month, day }) => {
  const result = [];
  const date = new Date(year, month, day);
  const today = getDayOfWeek(date);
  let weeksDay = Number(day) - today;
  for (let i = 0; i < 7; i += 1) {
    const [d, m, y] = toLocaleString(new Date(year, month, weeksDay), option).split('.');
    result[i] = `${y}.${m}.${d}`;
    weeksDay += 1;
  }

  return result;
};
/* eslint-enable functional/no-let, functional/no-loop-statement */

export const getPeriod = (date = new Date()) => {
  const endMonth = getDaysInMonth(date);
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const startDate = `.${month}.${year}`;
  return {
    startPeriod: `01${startDate}`,
    endPeriod: `${endMonth}${startDate}`,
  };
};

export const isDurationInSame = (start, end) => {
  const [startHours, startMinute] = start.split(':');
  const [endHours, endMinute] = end.split(':');
  const startStamp = Number(startHours) * 60 + Number(startMinute);
  const endStamp = Number(endHours) * 60 + Number(endMinute);
  return startStamp < endStamp;
};

export const toHoursFormat = (hours) => hours.slice(0, -3);

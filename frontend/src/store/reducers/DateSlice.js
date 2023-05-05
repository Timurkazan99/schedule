import { createSlice } from '@reduxjs/toolkit';
import { getDateObj, getMonthDate, getWeekDate } from '../../utils/dates';

const initialState = {
  date: getDateObj(new Date()),
  active: 'week',
  selected: '',
  week: [],
  month: [],
};

/* eslint-disable no-param-reassign */
export const DateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    update: (state, action) => {
      const date = new Date(action.payload.newDate);
      const dateObj = getDateObj(date);
      const week = getWeekDate(dateObj);
      const month = getMonthDate(dateObj);
      return {
        ...state, date: dateObj, week, month,
      };
    },
    setActive: (state, action) => {
      state.active = action.payload;
    },
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
  },
});
/* eslint-enable no-param-reassign */

export const { update, setActive, setSelected } = DateSlice.actions;
export const { reducer } = DateSlice;

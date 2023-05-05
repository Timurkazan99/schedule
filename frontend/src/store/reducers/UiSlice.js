import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalName: '',
  location: [],
};

/* eslint-disable no-param-reassign */
export const UiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    onShow: (state, action) => {
      state.modalName = action.payload;
    },
    onHide: (state) => {
      state.modalName = '';
    },
    addFilter: (state, action) => {
      state.location.push(action.payload);
    },
    delFilter: (state, action) => {
      state.location = state.location.filter((item) => item !== action.payload);
    },
    updateFilter: (state, action) => {
      const ids = action.payload;
      state.location = state.location.filter((item) => !ids.includes(item));
    },
  },
});
/* eslint-enable no-param-reassign */

export const {
  onShow, onHide, addFilter, delFilter, updateFilter,
} = UiSlice.actions;
export const { reducer } = UiSlice;

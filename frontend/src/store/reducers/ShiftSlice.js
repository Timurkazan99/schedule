import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import thunkFetchShifts from '../thunks/fetchShifts';
import { onHide } from './UiSlice';
import thunkFetchAttendance from '../thunks/fetchAttendance';

const shiftsAdapter = createEntityAdapter();
const initialState = shiftsAdapter.getInitialState({
  loading: null,
  error: null,
  active: null,
  selected: null,
});

/* eslint-disable no-param-reassign */
export const shiftsSlice = createSlice({
  name: 'shifts',
  initialState,
  reducers: {
    addShift: shiftsAdapter.addOne,
    removeShift: shiftsAdapter.removeOne,
    updateShift: shiftsAdapter.updateOne,
    setActive: (state, action) => {
      state.active = action.payload;
    },
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(thunkFetchShifts.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(thunkFetchShifts.fulfilled, (state, action) => {
        const shifts = action.payload;
        shiftsAdapter.addMany(state, shifts);
        state.loading = 'loaded';
        state.error = null;
      })
      .addCase(thunkFetchShifts.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error;
      })
      .addCase(thunkFetchAttendance.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(thunkFetchAttendance.fulfilled, (state, action) => {
        const shifts = action.payload;
        shiftsAdapter.setAll(state, shifts);
        state.loading = 'loaded';
        state.error = null;
      })
      .addCase(thunkFetchAttendance.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error;
      })
      .addCase(onHide, (state) => {
        state.selected = null;
      });
  },
});
/* eslint-enable no-param-reassign */

export const selectors = shiftsAdapter.getSelectors((state) => state.shifts);
export const { actions } = shiftsSlice;
export const { reducer } = shiftsSlice;

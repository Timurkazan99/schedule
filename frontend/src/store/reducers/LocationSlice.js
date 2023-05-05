import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import thunkFetchLocation from '../thunks/fetchLocation';
import { onHide } from './UiSlice';

const locationsAdapter = createEntityAdapter();
const initialState = locationsAdapter.getInitialState({
  selected: null,
  loading: null,
  error: null,
});

/* eslint-disable no-param-reassign */
export const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    addLocation: locationsAdapter.addOne,
    removeLocation: locationsAdapter.removeOne,
    updateLocation: locationsAdapter.updateOne,
    setActive: (state, action) => {
      state.active = action.payload;
    },
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(thunkFetchLocation.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(thunkFetchLocation.fulfilled, (state, action) => {
        const location = action.payload;
        locationsAdapter.addMany(state, location);
        state.loading = 'loaded';
        state.error = null;
      })
      .addCase(thunkFetchLocation.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error;
      })
      .addCase(onHide, (state) => {
        state.selected = null;
      });
  },
});
/* eslint-enable no-param-reassign */

export const selectors = locationsAdapter.getSelectors((state) => state.locations);
export const { actions } = locationsSlice;
export const { reducer } = locationsSlice;

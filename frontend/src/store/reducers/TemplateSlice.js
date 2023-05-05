import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import thunkFetchTemplates from '../thunks/fetchTemplate';
import { onHide } from './UiSlice';

const templatesAdapter = createEntityAdapter();
const initialState = templatesAdapter.getInitialState({
  selected: null,
  loading: null,
  error: null,
});

/* eslint-disable no-param-reassign */
export const templatesSlice = createSlice({
  name: 'templates',
  initialState,
  reducers: {
    addTemplate: templatesAdapter.addOne,
    removeTemplate: templatesAdapter.removeOne,
    updateTemplate: templatesAdapter.updateOne,
    setActive: (state, action) => {
      state.active = action.payload;
    },
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(thunkFetchTemplates.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(thunkFetchTemplates.fulfilled, (state, action) => {
        const location = action.payload;
        templatesAdapter.addMany(state, location);
        state.loading = 'loaded';
        state.error = null;
      })
      .addCase(thunkFetchTemplates.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error;
      })
      .addCase(onHide, (state) => {
        state.selected = null;
      });
  },
});
/* eslint-enable no-param-reassign */

export const selectors = templatesAdapter.getSelectors((state) => state.templates);
export const { actions } = templatesSlice;
export const { reducer } = templatesSlice;

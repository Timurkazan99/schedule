import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import thunkFetchUsers from '../thunks/fetchUsers';
import { onHide } from './UiSlice';

const usersAdapter = createEntityAdapter();
const initialState = usersAdapter.getInitialState({
  loading: null,
  error: null,
  active: null,
  selected: null,
});

/* eslint-disable no-param-reassign */
export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: usersAdapter.addOne,
    removeUser: usersAdapter.removeOne,
    updateUser: usersAdapter.updateOne,
    setActive: (state, action) => {
      state.active = action.payload;
    },
    setSelected: (state, action) => {
      state.selected = action.payload ?? 'null';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(thunkFetchUsers.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(thunkFetchUsers.fulfilled, (state, action) => {
        const users = action.payload;
        usersAdapter.addMany(state, users);
        state.loading = 'loaded';
        state.error = null;
      })
      .addCase(thunkFetchUsers.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error;
      })
      .addCase(onHide, (state) => {
        state.selected = null;
      });
  },
});
/* eslint-enable no-param-reassign */

export const selectors = usersAdapter.getSelectors((state) => state.users);
export const { actions } = userSlice;
export const { reducer } = userSlice;

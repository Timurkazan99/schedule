import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const notificationsAdapter = createEntityAdapter();
const initialState = notificationsAdapter.getInitialState({});

export const NotificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    add: notificationsAdapter.addOne,
    remove: notificationsAdapter.removeOne,
  },
});

export const selectors = notificationsAdapter.getSelectors((state) => state.notifications);
export const { actions } = NotificationsSlice;
export const { reducer } = NotificationsSlice;

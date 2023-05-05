import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as dateSlice } from './reducers/DateSlice';
import { reducer as uiSlice } from './reducers/UiSlice';
import { reducer as userSlice } from './reducers/UserSlice';
import { reducer as shiftSlice } from './reducers/ShiftSlice';
import { reducer as locationSlice } from './reducers/LocationSlice';
import { reducer as templateSlice } from './reducers/TemplateSlice';
import { reducer as notificationsSlice } from './reducers/NotificationSlice';

const rootReducer = combineReducers({
  users: userSlice,
  shifts: shiftSlice,
  templates: templateSlice,
  locations: locationSlice,
  notifications: notificationsSlice,
  date: dateSlice,
  ui: uiSlice,
});

export default function setupStore() {
  return configureStore({
    reducer: rootReducer,
  });
}

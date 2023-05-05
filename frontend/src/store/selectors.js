import { selectors as shiftSelector } from './reducers/ShiftSlice';
import { selectors as userSelector } from './reducers/UserSlice';
import { selectors as locationSelector } from './reducers/LocationSlice';
import { selectors as templateSelector } from './reducers/TemplateSlice';
import { selectors as notificationSelector } from './reducers/NotificationSlice';

const needFilter = (filter) => filter.length !== 0;
const filterCondition = (filter, par) => !needFilter(filter) || filter.includes(par);

export const getTemplates = (state) => templateSelector.selectAll(state);

export const getSelectedTemplate = (state) => {
  const id = state.templates.selected;
  return templateSelector.selectById(state, id);
};

export const getShifts = (state) => {
  const { location } = state.ui;
  const shifts = shiftSelector.selectAll(state);

  if (needFilter(location)) {
    return shifts.filter(({ locationId }) => filterCondition(location, Number(locationId)));
  }

  return shifts;
};

export const getSelectedShift = (state) => {
  const id = state.shifts.selected;
  return shiftSelector.selectById(state, id);
};

export const getUsers = (state) => userSelector.selectAll(state);

export const getUserById = (state, id) => userSelector.selectById(state, id);

export const getSelectedUser = (state) => {
  const id = state.users.selected;
  return userSelector.selectById(state, id);
};

export const getLocation = (state) => locationSelector.selectAll(state);

export const getSelectedLocation = (state) => {
  const id = state.locations.selected;
  return locationSelector.selectById(state, id);
};

export const getLocationById = (state, id) => locationSelector.selectById(state, id);

export const getFiltredData = (state, userLocations, isAdmin) => {
  const locations = locationSelector.selectAll(state);
  const templates = templateSelector.selectAll(state);
  const filtredLocations = isAdmin && userLocations ? locations.filter(({ id }) => userLocations.includes(id)) : locations;
  const ids = filtredLocations.map(({ id }) => id);
  const filtredTemplates = templates.filter(
    ({ locationId }) => ids.includes(locationId),
  );
  return [filtredLocations, filtredTemplates];
};

export const getActivePeriod = (state) => state.date[state.date.active];

export const getNotifications = (state, id) => {
  const notifications = notificationSelector.selectAll(state);
  const user = userSelector.selectById(state, id);
  return notifications.filter(({ creator, userId, locationId }) => {
    const isAdminNotificate = (id !== creator) && (user.locations.includes(locationId));
    const userNotificate = (id !== creator) && (id === userId);
    const adminNotificate = user?.locations ? isAdminNotificate : false;
    return userNotificate || adminNotificate;
  });
};

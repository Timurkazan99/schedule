import { useDispatch } from 'react-redux';
import { actions as userAction } from '../store/reducers/UserSlice';
import { actions as locationAction } from '../store/reducers/LocationSlice';
import { actions as templateAction } from '../store/reducers/TemplateSlice';
import { actions as shiftAction } from '../store/reducers/ShiftSlice';
import { actions as notificationAction } from '../store/reducers/NotificationSlice';

/* eslint-disable no-param-reassign */
export default function useNotification() {
  const dispatch = useDispatch();

  const handlerMap = {
    newUser: (value) => {
      dispatch(userAction.addUser(value));
    },
    updateUser: ({ id, ...changes }) => {
      dispatch(userAction.updateUser({ id, changes }));
    },
    removeUser: ({ id }) => {
      dispatch(userAction.removeUser(id));
    },
    newLocation: (value) => {
      dispatch(locationAction.addLocation(value));
    },
    updateLocation: ({ id, ...changes }) => {
      dispatch(locationAction.updateLocation({ id, changes }));
    },
    removeLocation: ({ id }) => {
      dispatch(locationAction.removeLocation(id));
    },
    newTemplate: (value) => {
      dispatch(templateAction.addTemplate(value));
    },
    updateTemplate: ({ id, ...changes }) => {
      dispatch(templateAction.updateTemplate({ id, changes }));
    },
    removeTemplate: ({ id }) => {
      dispatch(templateAction.removeTemplate(id));
    },
    newShift: ({ ...value }) => {
      dispatch(shiftAction.addShift(value));
    },
    updateShift: ({ id, ...changes }) => {
      dispatch(shiftAction.updateShift({ id, changes }));
    },
    removeShift: ({ id }) => {
      dispatch(shiftAction.removeShift(id));
    },
    notification: (value) => {
      value.id = Date.now();
      dispatch(notificationAction.add(value));
    },
  };
  return (token) => {
    const eventSource = new EventSource(`${process.env.REACT_APP_API_URL}api/notification/${token}`);

    eventSource.onmessage = ({ data }) => {
      const { eventName, ...value } = JSON.parse(data);
      handlerMap[eventName](value);
    };

    return eventSource;
  };
}
/* eslint-enable no-param-reassign */

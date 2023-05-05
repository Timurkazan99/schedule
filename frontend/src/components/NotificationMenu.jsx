import React, {useContext} from 'react';
import {Dropdown} from "react-bootstrap";
import Icon from "./Icon.jsx";
import {useDispatch, useSelector} from "react-redux";
import {getNotifications} from "../store/selectors";
import {Context} from "./ContextProvider.jsx";
import {actions as notificationActions} from "../store/reducers/NotificationSlice"
import {useTranslation} from "react-i18next";

const NotificationMenu = () => {
  const dispatch = useDispatch();
  const {logined} = useContext(Context);
  const notifications = useSelector((state) => getNotifications(state, logined.id));
  const isEmpty = notifications.length === 0;
  const color = isEmpty ? 'black' : 'orange';
  const { t } = useTranslation('translation', { keyPrefix: 'navBar'})

  return (
    <Dropdown
      align="end"
    >
      <Dropdown.Toggle
        variant="outline-light"
        style={{color}}
        className="border-0"
      >
        <Icon icon={isEmpty ? 'slashBell' : 'bell'}/>
      </Dropdown.Toggle>

      <Dropdown.Menu style={{maxHeight: '250px', overflowY: 'auto'}}>
        {
          isEmpty ?
            <span className='ms-2'>{t('noNotification')}</span>
            :
            notifications.map((notification) => {
              return (
                <Dropdown.Item
                  onClick={() => dispatch(notificationActions.remove(notification.id))}
                >
                  {notification.message}
                </Dropdown.Item>
              )
            })
        }
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NotificationMenu;
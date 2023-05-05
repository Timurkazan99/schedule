import React, {useContext} from 'react';
import {Button, Table} from "react-bootstrap";
import {batch, useDispatch, useSelector} from "react-redux";
import {onShow} from "../../store/reducers/UiSlice";
import {actions as userActions} from "../../store/reducers/UserSlice";
import {Context} from "../ContextProvider.jsx";
import {useTranslation} from "react-i18next";


const DesktopEmployeesTable = ({users}) => {
  const dispatch = useDispatch();
  const locations = useSelector((state) => state.locations.entities);
  const {logined: {isAdmin}} = useContext(Context);
  const { t } = useTranslation('translation', { keyPrefix: 'users'});

  const onClick = (user) => {
    batch(() => {
      dispatch(userActions.setSelected(user));
      dispatch(onShow( 'editUser'));
    })
  };

  return (
    <Table hover>
      <thead>
      <tr>
        <th>{t('fullName')}</th>
        <th>{t('position')}</th>
        <th
          width="300"
        >
          {t('location')}
        </th>
        <th>{t('phone')}</th>
        <th>{t('email')}</th>
      </tr>
      </thead>
      <tbody>
      {users.map((user) => (
        <tr
          key={user.id}
        >
          <td>{user.name} {user.surname}</td>
          <td>{user.position}</td>
          <td>{user?.locations?.length > 0 ? user.locations.map((id) => locations[id].name).join(', ') : 'Нет'}</td>
          <td>{user.phone}</td>
          <td>{user.email}</td>
          <td>
            {
              isAdmin &&
              <Button
                onClick={() => onClick(user.id)}
              >
                {t('edit')}
              </Button>
            }
          </td>
        </tr>
      ))}
      </tbody>
    </Table>
  );
};

export default DesktopEmployeesTable;
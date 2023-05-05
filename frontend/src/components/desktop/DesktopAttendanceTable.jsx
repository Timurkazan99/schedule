import React from 'react';
import {Table} from "react-bootstrap";
import {useSelector} from "react-redux";
import {getShifts} from "../../store/selectors";
import {useTranslation} from "react-i18next";

const DesktopAttendanceTable = () => {
  const table = useSelector(getShifts);
  const { t } = useTranslation('translation', { keyPrefix: 'attendance'});

  return (
    <Table hover>
      <thead>
      <tr>
        <th rowSpan="2">{t('fullName')}</th>
        <th>{t('position')}</th>
        <th>{t('time')}</th>
        <th>{t('salary')}</th>
        <th>{t('bonus')}</th>
        <th>{t('penalty')}</th>
        <th>{t('total')}</th>
      </tr>
      </thead>
      <tbody>
      {table.map((user) => (
        <tr
          key={user.id}
        >
          <td>{user.surname} {user.name}</td>
          <td>{user.position}</td>
          <td>{user.hours}</td>
          <td>{user.salary}</td>
          <td>{user.bonus}</td>
          <td>{user.penalty}</td>
          <td>{user.total}</td>
        </tr>
      ))}
      </tbody>
    </Table>
  );
};

export default DesktopAttendanceTable;
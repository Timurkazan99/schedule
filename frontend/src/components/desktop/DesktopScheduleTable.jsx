import React, {useContext} from 'react';
import {Table} from "react-bootstrap";
import {useSelector} from "react-redux";
import DesktopScheduleShift from "./DesktopScheduleShift.jsx";
import {getUsers, getActivePeriod} from "../../store/selectors";
import {Context} from "../ContextProvider.jsx";
import {toLocaleString} from "../../utils/dates";
import {useTranslation} from "react-i18next";

const DesktopScheduleTable = () => {
  const width = '194';
  const users = useSelector(getUsers).filter(({role}) => role === 'USER');
  const {logined} = useContext(Context);
  const period = useSelector(getActivePeriod);
  const { t } = useTranslation('translation', { keyPrefix: 'schedule'});

  return (
    <div className="schedule">
      <Table>
        <thead>
        <tr>
          <th width={width}>{t('employees')}</th>
          {period.map((day, index) => (
            <th
              key={index}
              width={width}
              className="date-header"
            >
              {toLocaleString(day)}
            </th>
          ))}
        </tr>
        </thead>
        <tbody>
        <tr >
          <td width={width} >{t('freeShift')}</td>
          <DesktopScheduleShift
            dates={period}
            isAdmin={logined.isAdmin}
            activeUser={logined.id}
          />
        </tr>
        {users.map(({name, surname, id}, index) => (
          <tr key={index} >
            <td width={width}>{name} {surname}</td>
            <DesktopScheduleShift
              user={id}
              dates={period}
              isAdmin={logined.isAdmin}
              activeUser={logined.id}
            />
          </tr>
        ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DesktopScheduleTable;
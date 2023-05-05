import React from 'react';
import {useSelector} from "react-redux";
import {Table} from "react-bootstrap";
import {toHoursFormat, toLocaleString} from "../../utils/dates";
import {useTranslation} from "react-i18next";

const DesktopMyShifts = ({shifts}) => {
  const locations = useSelector((state) => state.locations.entities);
  const { t } = useTranslation('translation', { keyPrefix: 'schedule'});

  return (
    <>
      <div className="d-flex justify-content-center">
        <h5>{t('myShift')}</h5>
      </div>
      <Table hover>
        <thead>
        <th>{t('date')}</th>
        <th>{t('time')}</th>
        <th>{t('locationLabel')}</th>
        <th>{t('bonus')}</th>
        <th>{t('penalty')}</th>
        </thead>
        <tbody>
        {
          shifts.map((shift) => (
            <tr>
              <td>{toLocaleString(shift.date)}</td>
              <td>{toHoursFormat(shift.beginAt)} – {toHoursFormat(shift.endAt)}</td>
              <td>{locations[shift.locationId].name}</td>
              <td>{shift.bonus}</td>
              <td>{shift.penalty}</td>
            </tr>
          ))
        }
        </tbody>
      </Table>
    </>
  );
};

export default DesktopMyShifts;
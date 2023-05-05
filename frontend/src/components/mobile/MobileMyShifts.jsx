import React from 'react';
import {useSelector} from "react-redux";
import {toHoursFormat, toLocaleString} from "../../utils/dates";
import {useTranslation} from "react-i18next";

const MobileMyShifts = ({shifts}) => {
  const locations = useSelector((state) => state.locations.entities);
  const { t } = useTranslation('translation', { keyPrefix: 'schedule'});

  return (
    <>
      <div className="d-flex justify-content-center">
        <h5>{t('myShift')}</h5>
      </div>
      <ul>
        {shifts.map((shift) => {
          const location = locations[shift.locationId];
          const description = {
            date: toLocaleString(shift.date),
            begin: toHoursFormat(shift.beginAt),
            end: toHoursFormat(shift.endAt),
            location: location.name,
            bonus: shift.bonus,
            penalty: shift.penalty,
          };

          return (
            <li className="d-flex mb-2" style={{minHeight: '120px', height: '0px'}}>
              <div className="vl" style={{borderColor: location?.color}}></div>
              <div style={{whiteSpace: 'pre-line'}} className="flex-grow-1">
                {t('description', description)}
              </div>
            </li>
          )
        })}
      </ul>
    </>
  );
};

export default MobileMyShifts;
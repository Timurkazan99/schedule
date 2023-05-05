import React from 'react';
import {Accordion} from "react-bootstrap";
import CustomToggle from "../common/CustomToggle.jsx";
import {useSelector} from "react-redux";
import {getShifts} from "../../store/selectors";
import {useTranslation} from "react-i18next";

const MobileAttendanceTable = () => {
  const table = useSelector(getShifts);
  const { t } = useTranslation('translation', { keyPrefix: 'locations'});

  return (
    <Accordion>
      {table.map((user) => (
        <Accordion.Item
          eventKey={user.id}
          key={user.id}
        >
          <Accordion.Header
            as={() => (
              <CustomToggle eventKey={user.id}>
                <span>{user.name} {user.surname}</span>
              </CustomToggle>
            )}
          />
          <Accordion.Body style={{whiteSpace: 'pre-wrap'}}>
            {t('description', user)}
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default MobileAttendanceTable;
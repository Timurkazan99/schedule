import React, {useEffect, useState} from 'react';
import {FloatingLabel, Form} from "react-bootstrap";
import {useSelector} from "react-redux";
import {getShifts, getUsers} from "../../store/selectors";
import {isDurationInSame} from "../../utils/dates";
import {useTranslation} from "react-i18next";

const EmployeeSelect = ({show, formik, fixed}) => {
  const date = useSelector((state) => state.date.selected);
  const shifts = useSelector(getShifts)
  const users = useSelector(getUsers).filter(({role}) => role === 'USER');
  const [freeWorkers, setFreeWorkers] = useState(users);
  const { t } = useTranslation('translation', { keyPrefix: 'shifts'});

  if(!show) {
    return null;
  }

  useEffect(() => {
    const filterId = shifts.filter((shift) => {
      if (shift.date === date) {
        return isDurationInSame(formik.values.beginAt, shift.endAt);
      }
      return false;
    }).map(({userId}) => userId);
    const filtredUsers = users.filter(({id}) => !filterId.includes(id));
    setFreeWorkers(filtredUsers);
  }, [formik.values.beginAt]);

  return (
    <FloatingLabel
      className="mb-2"
      label={t('employeeSelect')}
      style={{minWidth: "180px"}}
    >
      <Form.Select
        name="userId"
        value={formik.values.userId}
        disabled={fixed}
        onChange={formik.handleChange}
      >
        <option value='null'>{t('free')}</option>
        {freeWorkers.map(({name, surname, id}) => (
          <option value={id} key={id}>{name} {surname}</option>
        ))}
      </Form.Select>
    </FloatingLabel>
  );
};

EmployeeSelect.defaultProps = {
  show: true,
  fixed: false
}

export default EmployeeSelect;
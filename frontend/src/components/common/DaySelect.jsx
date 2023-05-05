import React from 'react';
import {Form} from "react-bootstrap";
import {toLocaleString, isDateGone, getWeekDate} from "../../utils/dates";
import {useSelector} from "react-redux";
import {DAYS_NAMES} from "../../utils/const";
import {useTranslation} from "react-i18next";

const DaySelect = ({show, days, isAdmin}) => {
  const date = useSelector((state) => state.date.selected);
  const [day, month, year] = date.split('.');
  const period = getWeekDate({year, month: Number(month) - 1, day});
  const { t } = useTranslation('translation', { keyPrefix: 'shifts'});

  if (!show) {
    return null
  }

  const onChange = (e, date) => {
    if (e.target.checked) {
      days.current.push(date);
    } else {
      days.current = days.current.filter((day) => day !== date);
    }
  }

  return (
    <div className="d-flex justify-content-between mb-2">
      {
        period.map((date, i) => {
          const day = toLocaleString(date, {dateStyle: 'short'})
          return (
            <Form.Check
              key={day}
              label={t(DAYS_NAMES[i])}
              onChange={(e) => onChange(e, day)}
              disabled={isDateGone(day) && !isAdmin}
            />
          )
        })
      }
    </div>
  );
};

export default DaySelect;
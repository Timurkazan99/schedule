import React, {useContext} from 'react';
import {Button, ButtonGroup} from "react-bootstrap";
import {batch, useDispatch, useSelector} from "react-redux";
import {setActive, update} from "../store/reducers/DateSlice";
import CustomButton from "./common/CustomButton.jsx";
import {onShow} from "../store/reducers/UiSlice";
import {Context} from "./ContextProvider.jsx";
import {useTranslation} from "react-i18next";

const mapPeriod = {
  week: (year, month, day, change) => {return {year, month, day: day + 7 * change}},
  month: (year, month, day, change) => {return {year, month: month + change, day: 1}},
}

const TableHeader = () => {
  const {logined: {isAdmin}} = useContext(Context);
  const currentDate = useSelector((state) => state.date);
  const dispatch = useDispatch();
  const { t } = useTranslation('translation', { keyPrefix: 'schedule'});

  const {date, active} = currentDate

  const changeDate = (change) => {
    const {year, month, day} = mapPeriod[active](date.year, date.month, date.day, change);
    const newDate = new Date(year, month, day).toDateString();
    dispatch(update({newDate}));
  }

  const changePeriod = (period) => {
    batch(() => {
      dispatch(setActive(period));
      dispatch(update({newDate: new Date().toDateString()}));
    });
  }

  return (
    <div className="d-flex justify-content-between">
      <ButtonGroup>
        <Button
          active={false}
          onClick={() => changeDate(-1)}
        >
          {t('back')}
        </Button>
        <Button
          active={false}
          onClick={() => changeDate(1)}
        >
          {t('next')}
        </Button>
      </ButtonGroup>
      <div>
        {
          isAdmin &&
            <CustomButton
              icon="download"
              onClick={() => dispatch(onShow('downloadSchedule'))}
            />
        }
        <ButtonGroup className="ms-2">
          <Button
            active={false}
            onClick={() => changePeriod('week')}
          >
            {t('week')}
          </Button>
          <Button
            active={false}
            onClick={() => changePeriod('month')}
          >
            {t('month')}
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default TableHeader;
import React from 'react';
import {useSelector} from "react-redux";
import {getShifts} from "../../store/selectors";
import MobileScheduleShift from "./MobileScheduleShift.jsx";
import {toLocaleString} from "../../utils/dates";

const MobileScheduleList = ({date}) => {
  const currentDate = toLocaleString(date, {dateStyle: 'short'})
  const filteredShifts = useSelector(getShifts).filter((shift) => shift.date === currentDate)

  return (
    <div>
      {filteredShifts.map((shift) => (
        <MobileScheduleShift key={shift.id} shift={shift}/>
      ))}
    </div>
  );
};

export default MobileScheduleList;
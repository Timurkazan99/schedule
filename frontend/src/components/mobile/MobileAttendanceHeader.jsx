import React from 'react';
import CustomButton from "../common/CustomButton.jsx";
import {useDispatch} from "react-redux";
import {onShow} from "../../store/reducers/UiSlice";

const MobileAttendanceHeader = () => {
  const dispatch = useDispatch();

  return (
    <div
      className="d-flex justify-content-end"
    >
      <CustomButton
        onClick={() => dispatch(onShow('downloadAttendance'))}
        icon='download'
      />
      <CustomButton
        onClick={() => dispatch(onShow('changePeriod'))}
        icon='edit'
      />
    </div>
  );
};

export default MobileAttendanceHeader;
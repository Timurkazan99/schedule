import React, {useContext} from 'react';
import {batch, useDispatch, useSelector} from "react-redux";
import {Context} from "../ContextProvider.jsx";
import {isDateGone, toLocaleString} from "../../utils/dates";
import {Accordion} from "react-bootstrap";
import {setSelected} from "../../store/reducers/DateSlice";
import {actions as shiftActions} from "../../store/reducers/ShiftSlice";
import {actions as userActions} from "../../store/reducers/UserSlice";
import {onShow} from "../../store/reducers/UiSlice";
import MobileScheduleList from "./MobileScheduleList.jsx";
import CustomToggle from "../common/CustomToggle.jsx";
import CustomButton from "../common/CustomButton.jsx";
import {getActivePeriod} from "../../store/selectors";

const MobileSchedule = () => {
  const dispatch = useDispatch();
  const period = useSelector(getActivePeriod);
  const {logined} = useContext(Context);
  const user = logined.isAdmin ? null : logined.id;
  const isActive = (day) => !isDateGone(toLocaleString(day, {dateStyle: 'short'})) || logined.isAdmin;

  const onClick = (date) => {
    batch(() => {
      dispatch(setSelected(date));
      dispatch(shiftActions.setSelected(null));
      dispatch(userActions.setSelected(user));
      dispatch(onShow('createShift'));
    });
  }

  return (
    <Accordion className="w-100" alwaysOpen>
      {period.map((day) => (
        <Accordion.Item
          eventKey={day.toString()}
          key={day.toString()}
          className="w-100"
        >
          <Accordion.Header
            as={() => (
              <CustomToggle eventKey={day.toString()}>
                <span>{toLocaleString(day)}</span>
                {
                  isActive(day) &&
                    <CustomButton
                      icon='create'
                      onClick={() => onClick(toLocaleString(day, {dateStyle: 'short'}))}
                    />
                }
              </CustomToggle>
            )}
          />
          <Accordion.Body>
            <MobileScheduleList date={day}/>
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default MobileSchedule;
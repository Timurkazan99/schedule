import React from 'react';
import {batch, useDispatch, useSelector} from "react-redux";
import {setSelected} from "../../store/reducers/DateSlice";
import {actions as shiftActions} from "../../store/reducers/ShiftSlice";
import {actions as userActions} from "../../store/reducers/UserSlice";
import {onShow} from "../../store/reducers/UiSlice";
import {isDateGone, toLocaleString} from "../../utils/dates";
import {getLocation, getShifts} from "../../store/selectors";
import {Button} from "react-bootstrap";
import Icon from "../Icon.jsx";
import CustomButton from "../common/CustomButton.jsx";
import getFontColor from "../../utils/getFontColor";
import "../../styles/shift.scss";

const DesktopScheduleShift = ({ user, dates, isAdmin, activeUser}) => {
  const shifts = useSelector(getShifts);
  const locations = useSelector(getLocation);
  const dispatch = useDispatch();
  const userShifts = shifts.filter(({userId}) => String(userId) === String(user));
  const shiftInPeriod = dates.map((date) => {
    const currentDate = toLocaleString(date, {dateStyle: 'short'});
    const shifts = userShifts.filter(({date: dt}) => dt === currentDate);
    return {
      shifts,
      date: currentDate
    }
  });

  const onClick = (date, shift, modalName, e) => {
    e.stopPropagation();
    batch(() => {
      dispatch(setSelected(date));
      dispatch(shiftActions.setSelected(shift));
      dispatch(userActions.setSelected( user));
      dispatch(onShow(modalName));
    });
  }

  return (
    <>
      {shiftInPeriod.map(({shifts, date}) => {
        const isEmpty = shifts.length > 0;
        const createShift = (e) => onClick(date,null, 'createShift', e);
        const isActive = ((user === activeUser) && !isDateGone(date));
        return (
          <td
            key={date}
          >
            <div
              className='d-flex justify-content-end'
            >
              { (isActive || isAdmin) &&
                <CustomButton
                  onClick={createShift}
                  icon='create'
                />
              }
            </div>
            { isEmpty &&
              shifts.map((shift) => {
                const hours = `${shift.beginAt} - ${shift.endAt}`;
                const color = locations.find(({id}) => id === shift.locationId)?.color ?? '#000000';
                const fontColor = getFontColor(color);
                const isApproved = (shift.status === 'approved');
                const condition = isActive && !isApproved;
                const editShift = (e) => onClick(date, shift.id, 'editShift', e);
                const infoShift = (e) => onClick(date, shift.id, 'infoShift', e);
                return (
                  <Button
                    className="shift"
                    key={shift.id}
                    style={{background: color, color: fontColor}}
                    onClick={condition || isAdmin ? editShift : infoShift }
                  >
                    <Icon className="me-1" icon={shift.status} color={color}/>
                    {
                      shift.bonus != 0 &&
                        <Icon className="me-1" icon='cash' color={color}/>
                    }
                    {hours}
                  </Button>
                )
              })
            }
          </td>
        )
      })}
    </>
  );
};

DesktopScheduleShift.defaultProps = {
  user: 'null'
}

export default DesktopScheduleShift;
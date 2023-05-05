import React, {useContext} from 'react';
import Icon from "../Icon.jsx";
import {isDateGone} from "../../utils/dates";
import {batch, useDispatch, useSelector} from "react-redux";
import {getLocationById, getUserById} from "../../store/selectors";
import {setSelected} from "../../store/reducers/DateSlice";
import {actions as shiftActions} from "../../store/reducers/ShiftSlice";
import {actions as userActions} from "../../store/reducers/UserSlice";
import {onShow} from "../../store/reducers/UiSlice";
import {Context} from "../ContextProvider.jsx";
import CustomButton from "../common/CustomButton.jsx";
import {useTranslation} from "react-i18next";

const MobileScheduleShift = ({shift}) => {
  const {logined} = useContext(Context);
  const dispatch = useDispatch();
  const location = useSelector(state => getLocationById(state, shift.locationId));
  const user = useSelector(state => getUserById(state, shift.userId));
  const { t } = useTranslation('translation', { keyPrefix: 'schedule'});
  const title = user ? `${user.name} ${user.surname}` : t('freeShift');
  const description = `${title}\n${location?.name || ''} ${shift.beginAt} - ${shift.endAt}`
  const isEditable = logined.isAdmin || ((logined.id === shift.userId) && (!isDateGone(shift.date)) && (shift.status === 'review'));

  const onClick = () => {
    batch(() => {
      dispatch(setSelected(shift.date));
      dispatch(shiftActions.setSelected(shift.id));
      dispatch(userActions.setSelected(shift.userId));
      dispatch(onShow('editShift'));
    });
  }

  return (
    <div className='d-flex ms-2 mb-1' style={{minHeight: '50px', height: '0px'}}>
      <div className="vl" style={{borderColor: location?.color}}></div>
      <div className="w-100">
        <div className='d-flex w-100 align-items-center'>
          <Icon className="me-1" icon={shift.status}/>
          {
            shift.bonus != 0 && <Icon className="me-1" icon='cash'/>
          }
          <div style={{whiteSpace: 'pre-line'}} className="flex-grow-1">
            {description}
          </div>
          {
            isEditable &&
              <CustomButton
                onClick={onClick}
                icon='edit'
              />
          }
        </div>
      </div>
    </div>
  );
};

export default MobileScheduleShift;



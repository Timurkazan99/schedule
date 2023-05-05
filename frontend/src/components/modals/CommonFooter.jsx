import React, {useContext} from 'react';
import {Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {Context} from "../ContextProvider.jsx";
import {updateShift} from "../../http/shiftApi";
import {onHide} from "../../store/reducers/UiSlice";
import {getSelectedShift} from "../../store/selectors";
import {toast} from "react-toastify";
import CommonDelete from "./CommonDelete.jsx";
import {useTranslation} from "react-i18next";
import isFreeShift from "../../utils";

const CommonFooter = ({delButton, nameButton, freeShiftBtn}) => {
  const dispatch = useDispatch();
  const {logined: {isAdmin}} = useContext(Context);
  const user = useSelector((state) => state.users.selected);
  const modalName = useSelector((state) => state.ui.modalName);
  const shift = useSelector(getSelectedShift);
  const { t: modalT } = useTranslation('translation', { keyPrefix: 'modal'});
  const { t: shiftT } = useTranslation('translation', { keyPrefix: 'shifts'});

  return (
    <>
      {
        delButton && <CommonDelete variant={modalName}/>
      }
      {
        !isFreeShift(user) && freeShiftBtn && isAdmin &&
          <Button
            variant="primary"
            onClick={async () => {
              try {
                await updateShift({...shift, dates: [shift.date], userId: null})
                toast.warning(shiftT('toFreeShiftToast'))
                dispatch(onHide());
              } catch ({response}) {
                toast.error(response.data.message)
              }
            }}
          >
            {shiftT('toFreeShift')}
          </Button>
      }
      <Button variant="success" type="submit" form="activeForm">{modalT(nameButton)}</Button>
    </>
  );
};

CommonFooter.defaultProps = {
  delButton: null,
  nameButton: '',
  freeShiftBtn: false
}

export default CommonFooter;
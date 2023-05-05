import React, {useContext} from 'react';
import {Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {getSelectedShift} from "../../store/selectors";
import {isDateGone} from "../../utils/dates";
import {updateShift} from "../../http/shiftApi";
import {onHide} from "../../store/reducers/UiSlice";
import {Context} from "../ContextProvider.jsx";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";

const InfoFooter = ({type}) => {
  const dispatch = useDispatch();
  const shift = useSelector(getSelectedShift);
  const {logined: {id}} = useContext(Context)
  const isGone = type === 'shift' ? !isDateGone(shift.date) : false;
  const isFreeShift = !shift?.userId;
  const { t: modalT } = useTranslation('translation', { keyPrefix: 'modal'});
  const { t: shiftT } = useTranslation('translation', { keyPrefix: 'shifts'});

  return (
    <>
      <Button
        variant={"danger"}
        onClick={async () => dispatch(onHide())}
      >
        {modalT('close')}
      </Button>
      {
        isFreeShift && isGone &&
          <Button
            variant={"success"}
            onClick={async () => {
              try {
                await updateShift({...shift, dates: [shift.date], userId: id})
                dispatch(onHide());
                toast.success(shiftT('assignToast'));
              } catch ({response}) {
                toast.error(response.data.message)
              }
            }}
          >
            {shiftT('take')}
          </Button>
      }
    </>
  );
};

export default InfoFooter;

import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createShift, updateShift } from '../http/shiftApi';
import { onHide } from '../store/reducers/UiSlice';
import isFreeShift from '../utils';

export default function useShiftSubmit(edit, days, user, shift) {
  const dispatch = useDispatch();
  const date = useSelector((state) => state.date.selected);

  return async (values) => {
    try {
      const bonus = isFreeShift(values.templateId) || isFreeShift(user) ? values.bonus : '0';
      if (edit) {
        await updateShift({
          id: shift.id, ...values, dates: [date], bonus,
        });
        toast.success('смена изменена');
        dispatch(onHide());
      } else {
        await createShift({
          ...values,
          dates: days.current.length !== 0 ? [...new Set(days.current)] : [date],
          bonus,
        });
        toast.success('смена создана');
        dispatch(onHide());
      }
    } catch ({ response }) {
      toast.error(response.data.message);
    }
  };
}

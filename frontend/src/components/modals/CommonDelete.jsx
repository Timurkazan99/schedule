import React from 'react';
import {Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {onHide} from "../../store/reducers/UiSlice";
import {deleteTemplate} from "../../http/template";
import {toast} from "react-toastify";
import {deleteShift} from "../../http/shiftApi";
import {deleteLocation} from "../../http/locationApi";
import {deleteUser} from "../../http/userApi";
import {useTranslation} from "react-i18next";

const mapFit = {
  'editUser': {
    func: deleteUser,
    name: 'users',
  },
  'editLocation': {
    func: deleteLocation,
    name: 'locations',
  },
  'editTemplate': {
    func: deleteTemplate,
    name: 'templates',
  },
  'editShift': {
    func: deleteShift,
    name: 'shifts',
  }
};

const CommonDelete = ({variant}) => {
  const dispatch = useDispatch();
  const {func, name} = mapFit?.[variant];
  const id = useSelector((state) => state[name].selected);
  const { t } = useTranslation('translation', { keyPrefix: name});

  return (
    <Button
      variant="danger"
      onClick={async () => {
        await func(id);
        toast.warning(t('deleteToast'));
        dispatch(onHide());
      }}
    >
      {t('delete')}
    </Button>
  );
};

export default CommonDelete;
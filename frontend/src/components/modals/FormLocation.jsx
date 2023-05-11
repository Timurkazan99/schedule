import React, {useEffect} from 'react';
import {Form} from "react-bootstrap";
import {useFormik} from "formik";
import {LocationSchema} from "../../utils/validators";
import {useDispatch, useSelector} from "react-redux";
import {getSelectedLocation} from "../../store/selectors";
import {createLocation, updateLocation} from "../../http/locationApi";
import {onHide} from "../../store/reducers/UiSlice";
import {toast} from "react-toastify";
import Field from "../common/Field.jsx";
import {useTranslation} from "react-i18next";

const initialValues = {
  name: '',
  address: '',
  color: '#000000'
}

const FormLocation = ({edit}) => {
  const dispatch = useDispatch()
  const location = useSelector((state) => getSelectedLocation(state))
  const { t } = useTranslation('translation', { keyPrefix: 'locations'});

  const formik = useFormik({
    initialValues,
    validationSchema: LocationSchema,
    onSubmit: async (values) => {
      try {
        if (edit) {
          await updateLocation({id: location.id, ...values});
          toast.success(t('updateToast'));
          dispatch(onHide());
        } else {
          await createLocation(values);
          toast.success(t('createToast'));
          dispatch(onHide());
        }
      } catch ({response}) {
        toast.error(response.data.message)
      }
    }
  });

  useEffect(() => {
    if (edit) {
      formik.setValues(location);
    }
  }, []);

  return (
    <Form
      id="activeForm"
      className="d-flex flex-column"
      onSubmit={formik.handleSubmit}
    >
      <Field
        name='name'
        label={t('name')}
        className="mb-2"
        formik={formik}
      />
      <Field
        name='address'
        label={t('address')}
        className="mb-2"
        formik={formik}
      />
      <Form.Label
        className="align-self-end d-flex"
      >
        <span
          className="align-self-center me-1"
        >
          {t('color')}
        </span>
        <Form.Control
          type="color"
          name="color"
          placeholder="#000000"
          value={formik.values.color}
          onChange={formik.handleChange}
        />
      </Form.Label>
    </Form>
  );
};

FormLocation.defaultProps = {
  edit: false,
}

export default FormLocation;
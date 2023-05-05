import React from 'react';
import {Form} from "react-bootstrap";
import Field from "../common/Field.jsx";
import {getPeriod} from "../../utils/dates";
import {useFormik} from "formik";
import {PeriodSchema} from "../../utils/validators";
import {batch, useDispatch} from "react-redux";
import fetchAttendance from "../../store/thunks/fetchAttendance";
import {onHide} from "../../store/reducers/UiSlice";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";

const FormAttendance = () => {
  const dispatch = useDispatch();
  const {startPeriod, endPeriod} = getPeriod();
  const initialValues = {startPeriod, endPeriod};
  const { t } = useTranslation('translation', { keyPrefix: 'attendance'});

  const formik = useFormik({
    initialValues,
    validationSchema: PeriodSchema,
    onSubmit: ({startPeriod, endPeriod}) => {
      try {
        batch(() => {
          dispatch(fetchAttendance(startPeriod, endPeriod));
          dispatch(onHide());
        })
      } catch ({response}) {
        toast.error(response.data.message)
      }
    }
  });

  return (
    <Form
      className="d-flex justify-content-between"
      onSubmit={formik.handleSubmit}
    >
      <Field
        className="me-1 flex-grow-1"
        label={t('startPeriod')}
        name='startPeriod'
        formik={formik}
      />
      <Field
        className="flex-grow-1"
        label={t('endPeriod')}
        name='endPeriod'
        formik={formik}
      />
    </Form>
  );
};

export default FormAttendance;
import React from 'react';
import {Form} from "react-bootstrap";
import {getFile} from "../../http/attendanceApi";
import {getPeriod} from "../../utils/dates";
import {toast} from "react-toastify";
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {onHide} from "../../store/reducers/UiSlice";
import {PeriodSchema} from "../../utils/validators";
import Field from "../common/Field.jsx";
import {useTranslation} from "react-i18next";

const DownloadAttendance = () => {
  const dispatch = useDispatch();
  const {startPeriod, endPeriod} = getPeriod();
  const initialValues = {startPeriod, endPeriod};
  const { t } = useTranslation('translation', { keyPrefix: 'attendance'});

  const formik = useFormik({
    initialValues,
    validationSchema: PeriodSchema,
    onSubmit: async (values) => {
      try {
        await getFile(values);
        toast.success(t('downloadToast'));
        dispatch(onHide());
      } catch ({response}) {
        toast.error(response.data.message)
      }
    }
  })

  return (
    <Form
      id="activeForm"
      className="d-flex"
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

export default DownloadAttendance;
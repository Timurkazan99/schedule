import React from 'react';
import {Button, Form} from "react-bootstrap";
import {useFormik} from "formik";
import {getPeriod} from "../../utils/dates"
import {getFile} from "../../http/attendanceApi";
import {toast} from "react-toastify";
import CustomButton from "../common/CustomButton.jsx";
import {PeriodSchema} from "../../utils/validators";
import fetchAttendance from "../../store/thunks/fetchAttendance";
import {useDispatch} from "react-redux";
import Field from "../common/Field.jsx";
import {useTranslation} from "react-i18next";

const DesktopAttendanceHeader = () => {
  const dispatch = useDispatch();
  const {startPeriod, endPeriod} = getPeriod();
  const initialValues = {startPeriod, endPeriod};
  const { t } = useTranslation('translation', { keyPrefix: 'attendance'});

  const formik = useFormik({
    initialValues,
    validationSchema: PeriodSchema,
    onSubmit: (values) => {
      try {
        dispatch(fetchAttendance(values));
      } catch ({response}) {
        toast.error(response.data.message)
      }
    }
  })

  return (
    <Form
      className="d-flex justify-content-between"
      onSubmit={formik.handleSubmit}
    >
      <div className="d-flex">
        <Field
          type='double'
          name1='startPeriod'
          name2='endPeriod'
          label1={t('startPeriod')}
          label2={t('endPeriod')}
          className1='me-1 flex-grow-1'
          className2='flex-grow-1'
          formik={formik}
        />
      </div>

      <div className="my-auto">
        <CustomButton
          icon="download"
          onClick={async () => {
            try {
              await getFile(formik.values);
              toast.success(t('downloadToast'));
            } catch ({response}) {
              toast.error(response.data.message)
            }
          }}
        />
        <Button
          className="ms-2"
          type="submit"
        >
          {t('calculate')}
        </Button>
      </div>
    </Form>
  );
};

export default DesktopAttendanceHeader;
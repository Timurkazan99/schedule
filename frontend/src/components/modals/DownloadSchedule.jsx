import React from 'react';
import {Form} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {getLocation} from "../../store/selectors";
import {getFile} from "../../http/shiftApi";
import {toLocaleString} from "../../utils/dates";
import {toast} from "react-toastify";
import {onHide} from "../../store/reducers/UiSlice";
import {useFormik} from "formik";
import {PeriodSchema} from "../../utils/validators";
import Field from "../common/Field.jsx";
import {useTranslation} from "react-i18next";

const DownloadSchedule = () => {
  const dispatch = useDispatch();
  const locations = useSelector(getLocation);
  const period = useSelector((state) => state.date.week);
  const start = toLocaleString(period[0], {dateStyle: 'short'});
  const end = toLocaleString(period[6], {dateStyle: 'short'});
  const { t } = useTranslation('translation', { keyPrefix: 'schedule'});

  const formik = useFormik({
    initialValues: {
      startPeriod: start,
      endPeriod: end,
      locationId: 'null'
    },
    validationSchema: PeriodSchema,
    onSubmit: async (values) => {
      try {
        const location = values.locationId !== 'null' ? values.locationId : null;
        await getFile(values.startPeriod, values.endPeriod, location);
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
      onSubmit={formik.handleSubmit}
    >
      <div className="d-flex mb-2">
        <Field
          name='startPeriod'
          label={t('startPeriod')}
          className="me-1 flex-grow-1"
          formik={formik}
        />
        <Field
          name='endPeriod'
          label={t('endPeriod')}
          className="flex-grow-1"
          formik={formik}
        />
      </div>
      <Field
        type='select'
        name='locationId'
        label={t('location')}
        items={locations}
        def={{value: 'null', name: t('all')}}
        formik={formik}
      />
    </Form>
  );
};

export default DownloadSchedule;
import React, {useEffect, useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {useFormik} from "formik";
import {FormSchema} from "../utils/validators";
import {useDispatch, useSelector} from "react-redux";
import {getLocation} from "../store/selectors";
import {createShift} from "../http/shiftApi";
import {toast} from "react-toastify";
import {onHide} from "../store/reducers/UiSlice";
import Field from "./common/Field.jsx";
import {useTranslation} from "react-i18next";

const initialValues = {
  date: '',
  userId: '',
  locationId: '',
  beginAt: '',
  endAt: '',
  bonus: '',
  penalty: ''
}

const UploadShiftForm = ({shift}) => {
  const dispatch = useDispatch();
  const locations = useSelector(getLocation);
  const [fixed, setFixed] = useState(false);
  const { t } = useTranslation('translation', { keyPrefix: 'shifts'})

  const formik = useFormik({
    validationSchema: FormSchema,
    initialValues,
    onSubmit: async (values) => {
      try {
        const {date, ...newValues} = values;
        await createShift({...newValues, dates: [date], break: '00:00'});
        toast.success(t('createToast'));
        setFixed(true);
        dispatch(onHide());
      } catch ({response}) {
        toast.error(response.data.message)
      }
    }
  });

  useEffect(() => {
    formik.setValues(shift);
  }, [shift])

  return (
    <Form
      className="d-flex"
      onSubmit={formik.handleSubmit}
    >
      <Field
        name='date'
        label={t('date')}
        className="me-2"
        formik={formik}
      />
      <Field
        type='employee'
        formik={formik}
        fixed={fixed}
      />
      <Field
        name='beginAt'
        label={t('beginAt')}
        className="mx-2"
        formik={formik}
      />
      <Field
        name='endAt'
        label={t('endAt')}
        className="me-2"
        formik={formik}
      />
      <Field
        type='select'
        name='locationId'
        label={t('location')}
        className="me-2"
        items={locations}
        formik={formik}
      />
      <Field
        name='bonus'
        label={t('bonus')}
        className="me-2"
        formik={formik}
      />
      <Field
        name='penalty'
        label={t('penalty')}
        className="me-2"
        formik={formik}
      />
      <Button
        type='submit'
        disabled={fixed}
        style={{height: "58px"}}
      >
        {
          fixed ? t('createdBtn') : t('createBtn')
        }
      </Button>
    </Form>
  );
};

export default UploadShiftForm;
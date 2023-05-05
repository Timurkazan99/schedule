import React, {useContext, useRef} from 'react';
import {useSelector} from "react-redux";
import {Form} from "react-bootstrap";
import {Context} from "../ContextProvider.jsx";
import useShiftFormik from "../../hooks/useShiftFormik";
import Field from "../common/Field.jsx";
import isFreeShift from "../../utils";
import {isDateGone} from "../../utils/dates";
import {useTranslation} from "react-i18next";

const FormShift = ({edit, fixed}) => {
  const days = useRef([]);
  const {logined} = useContext(Context);
  const user = useSelector((state) => state.users.selected);
  const date = useSelector((state) => state.date.selected);
  const {formik, locations, templates} = useShiftFormik(edit, days, user, logined);
  const { t } = useTranslation('translation', { keyPrefix: 'shifts'});

  return (
    <Form
      id="activeForm"
      onSubmit={formik.handleSubmit}
    >
      <Field
        type='employee'
        show={isFreeShift(user) && logined.isAdmin}
        formik={formik}
      />
      <Field
        type='select'
        name='locationId'
        label={t('location')}
        className='mb-2'
        items={locations}
        formik={formik}
        disabled={fixed}
      />
      <Field
        type='select'
        name='templateId'
        label={t('template')}
        className='mb-2'
        items={templates
          .filter(({locationId}) => String(locationId) === String(formik.values.locationId))
        }
        def={{
          value: 'null',
          name: t('another')
        }}
        formik={formik}
        disabled={fixed}
      />
      <Field
        type='double'
        name1='beginAt'
        name2='endAt'
        label1={t('beginAt')}
        label2={t('endAt')}
        className1='me-2 w-50'
        className2='w-50'
        formik={formik}
        disabled={!isFreeShift(formik.values.templateId) || fixed}
      />
      <Field
        name='break'
        label={t('break')}
        className='mb-2'
        formik={formik}
        disabled={!isFreeShift(formik.values.templateId) || fixed}
      />
      <Field
        type='days'
        show={!edit}
        days={days}
        isAdmin={logined.isAdmin}
      />
      <Field
        name='bonus'
        label={t('bonus')}
        className='mb-2'
        show={isFreeShift(user) || isFreeShift(formik.values.templateId)}
        disabled={!logined.isAdmin}
        formik={formik}
      />
      <Field
        name='penalty'
        label={t('penalty')}
        show={isDateGone(date)}
        disabled={!logined.isAdmin}
        formik={formik}
      />
    </Form>
  );
};

FormShift.defaultProps = {
  edit: false,
  fixed: false,
}

export default FormShift;
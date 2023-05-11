import React, {useEffect} from 'react';
import {Form} from "react-bootstrap";
import {useFormik} from "formik";
import {templateSchema} from "../../utils/validators";
import {useDispatch, useSelector} from "react-redux";
import {getSelectedTemplate} from "../../store/selectors";
import {onHide} from "../../store/reducers/UiSlice";
import {createTemplate, updateTemplate} from "../../http/template";
import {toast} from "react-toastify";
import Field from "../common/Field.jsx";
import {useTranslation} from "react-i18next";

const initialValues = {
  name: '',
  beginAt: '08:00',
  endAt: '18:00',
  break: '00:00'
}

const FormTemplate = ({edit, fixed}) => {
  const dispatch = useDispatch();
  const template = useSelector(getSelectedTemplate);
  const locationId = useSelector((state) => state.locations.selected);
  const { t } = useTranslation('translation', { keyPrefix: 'templates'});

  const formik = useFormik({
    validationSchema: templateSchema,
    initialValues,
    onSubmit: async (values) => {
      try {
        if (edit) {
          await updateTemplate({id: template.id, locationId, ...values});
          toast.success(t('updateToast'));
          dispatch(onHide());
        } else {
          await createTemplate({...values, locationId});
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
      formik.setValues(template);
    }
  }, []);

  return (
    <Form
      id="activeForm"
      onSubmit={formik.handleSubmit}
    >
      <Field
        name="name"
        label={t('name')}
        className='mb-2'
        disabled={fixed}
        formik={formik}
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
        disabled={fixed}
      />
      <Field
        name="break"
        label={t('break')}
        className='mb-2'
        disabled={fixed}
        formik={formik}
      />
    </Form>
  );
};

FormTemplate.defaultProps = {
  edit: false,
}

export default FormTemplate;
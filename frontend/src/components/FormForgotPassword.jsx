import React from 'react';
import {Form} from "react-bootstrap";
import {useFormik} from "formik";
import {EmailSchema} from "../utils/validators";
import {forgotPassword} from "../http/userApi";
import Field from "./common/Field.jsx";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";

const FormForgotPassword = ({update}) => {
  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: EmailSchema,
    onSubmit: async (values) => {
      try {
        await forgotPassword(values.email);
        update(true);
      } catch (err) {
        toast.error(err)
      }
    }
  })
  const { t } = useTranslation('translation', { keyPrefix: 'resetPassword'});

  return (
    <Form
      id="forgotPasswordForm"
      onSubmit={formik.handleSubmit}
    >
      <Field
        name='email'
        label={t('email')}
        className="me-1"
        formik={formik}
      />
    </Form>
  );
};

export default FormForgotPassword;
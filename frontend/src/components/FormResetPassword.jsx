import React from 'react';
import {Form} from "react-bootstrap";
import {resetPassword} from "../http/userApi";
import {useFormik} from "formik";
import {PasswordSchema} from "../utils/validators";
import Field from "./common/Field.jsx";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";

const FormResetPassword = ({update, id, token}) => {
  const formik = useFormik({
    initialValues: {
      password: '',
      passwordConfirmation: ''
    },
    validationSchema: PasswordSchema,
    onSubmit: async (values) => {
      try {
        await resetPassword(id, token, values.password);
        update(true);
      } catch (err) {
        toast.error(err)
      }
    }
  });
  const { t } = useTranslation('translation', { keyPrefix: 'resetPassword'});

  return (
    <Form
      id="forgotPasswordForm"
      onSubmit={formik.handleSubmit}
    >
      <Field
        type='password'
        name='password'
        label={t('password')}
        className="mb-2"
        formik={formik}
      />
      <Field
        type='password'
        name='passwordConfirmation'
        label={t('passwordConfirmation')}
        formik={formik}
      />
    </Form>
  );
};

export default FormResetPassword;
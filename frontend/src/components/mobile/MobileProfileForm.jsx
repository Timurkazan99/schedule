import React from 'react';
import {Col, Row} from "react-bootstrap";
import Field from "../common/Field.jsx";
import {useTranslation} from "react-i18next";

const MobileProfileForm = ({formik}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'users'});

  return (
    <Row>
      <Col>
        <Field
          name='name'
          label={t('name')}
          className="mb-3"
          formik={formik}
        />
        <Field
          name='surname'
          label={t('surname')}
          className="mb-3"
          formik={formik}
        />
        <Field
          name='phone'
          label={t('phone')}
          className="mb-3"
          formik={formik}
        />
        <Field
          name='email'
          label={t('email')}
          className="mb-3"
          formik={formik}
        />
        <Field
          type='password'
          name='password'
          label={t('password')}
          className="mb-3"
          formik={formik}
        />
        <Field
          type='password'
          name='confirmPassword'
          label={t('confirmPassword')}
          className="mb-3"
          formik={formik}
        />
        <Field
          name='position'
          label={t('position')}
          className="mb-3"
          disabled={true}
          formik={formik}
        />
        <Field
          name='salary'
          label={t('salary')}
          className="mb-3"
          disabled={true}
          formik={formik}
        />
        <Field
          name='bonuses'
          label={t('bonuses')}
          className="mb-3"
          disabled={true}
          formik={formik}
        />
        <Field
          name='penalties'
          label={t('penalties')}
          className="mb-3"
          disabled={true}
          formik={formik}
        />
        <Field
          name='time'
          label={t('time')}
          className="mb-3"
          disabled={true}
          formik={formik}
        />
        <Field
          name='total'
          label={t('total')}
          className="mb-3"
          disabled={true}
          formik={formik}
        />
      </Col>
    </Row>
  );
};

export default MobileProfileForm;
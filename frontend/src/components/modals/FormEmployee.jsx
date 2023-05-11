import React, {useState, useEffect} from 'react';
import {Col, Form, Row} from "react-bootstrap";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {getLocation, getSelectedUser} from "../../store/selectors";
import {onHide} from "../../store/reducers/UiSlice";
import {UserSchema} from "../../utils/validators";
import {createUser, updateUser} from "../../http/userApi";
import {toast} from "react-toastify";
import LocationIdInput from "../common/LocationIdInput.jsx";
import Field from "../common/Field.jsx";
import {useTranslation} from "react-i18next";

const initialValues = {
  name: '',
  surname: '',
  phone: '',
  email: '',
  position: '',
  salary: '',
};

const FormEmployee = ({edit}) => {
  const dispatch = useDispatch();
  const user = useSelector(getSelectedUser);
  const locations = useSelector(getLocation);
  const [isAdmin, setIsAdmin] = useState(user && (user?.role === "ADMIN"));
  const initSelectedLocation = user?.locations !== null ? locations.filter(({id}) => user?.locations?.includes(id)) : [];
  const [selectedLocation, setSelectedLocation] = useState(initSelectedLocation);
  const { t } = useTranslation('translation', { keyPrefix: 'users'});

  const formik = useFormik({
    validationSchema: UserSchema,
    initialValues,
    onSubmit: async (values) => {
      try {
        const newValues = {
          ...values,
          locations: selectedLocation.length > 0 ? [...new Set(selectedLocation.map(({id}) => id))] : null,
          role: isAdmin ? 'ADMIN' : 'USER'
        };
        if (edit) {
          await updateUser({id: user.id, ...newValues});
          toast.success(t('updateToast'));
          dispatch(onHide());
        } else {
          await createUser(newValues);
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
      formik.setValues(user);
    }
  }, []);

  return (
    <Form
      id="activeForm"
      onSubmit={formik.handleSubmit}
    >
      <Row>
        <Col>
          <Field
            name='name'
            label={t('name')}
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
            name='position'
            label={t('position')}
            className="mb-3"
            formik={formik}
          />
        </Col>
        <Col>
          <Field
            name='surname'
            label={t('surname')}
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
            name='salary'
            label={t('salary')}
            className="mb-3"
            formik={formik}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Check
            className="my-2"
            label={t('isAdmin')}
            checked={isAdmin}
            onChange={() => {
              setIsAdmin(!isAdmin)
              setSelectedLocation(!isAdmin ? initSelectedLocation : []);
            }}
          />
          {isAdmin ?
            <LocationIdInput
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              locations={locations}
            />
            :
            <Field
              label={t('location')}
              value={selectedLocation?.[0]?.id ?? "null"}
              onChange={(e) => {
                const value = !isNaN(e.target.value) ? [{id: Number(e.target.value)}] : [];
                setSelectedLocation(value);
              }}
              items={locations}
              def={{
                value: null,
                name: t('emptyLocation')
              }}
            />
          }
        </Col>
      </Row>
    </Form>
  );
};

FormEmployee.defaultProps = {
  edit: false,
}

export default FormEmployee;
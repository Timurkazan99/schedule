import React, {useEffect} from 'react';
import {useFormik} from "formik";
import {getUser, updateUser} from "../http/userApi";
import {Form, Row, Button} from "react-bootstrap";
import {toast} from "react-toastify";
import {SignupSchema} from "../utils/validators";
import {getUserResult} from "../http/attendanceApi";
import {getMyShift} from "../http/shiftApi";
import MobileProfileForm from "./mobile/MobileProfileForm.jsx";
import DesktopProfileForm from "./desktop/DesktopProfileForm.jsx";
import {useTranslation} from "react-i18next";

const ProfileForm = ({isMobile, userId, setMyShifts}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'users'})
  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      phone: '',
      email: '',
      position: '',
      salary: '',
      password: '',
      passwordConfirmation: ''
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      try {
        const newPassword = values.password === '' ? null : formik.values.password
        await updateUser({...values, password: newPassword, id: userId});
        toast.success(t('updateProfileToast'));
      } catch ({response}) {
        toast.error(response.data.message)
      }
    }
  });

  const getData = async () => {
    const userData = await getUser(userId);
    const time = await getUserResult(userId);
    const shifts = await getMyShift(userId);
    return {...time, ...userData, shifts}
  };

  useEffect(() => {
    getData().then(({shifts, ...data}) => {
      formik.setValues(data);
      setMyShifts(shifts);
    });
  }, []);

  return (
    <Form
      className="mx-auto"
      onSubmit={formik.handleSubmit}
    >
      {
        isMobile ?
          <MobileProfileForm formik={formik}/>
          :
          <DesktopProfileForm formik={formik}/>
      }
      <Row>
        <Button
          className="mx-auto"
          variant="success"
          type="submit"
        >
          {t('update')}
        </Button>
      </Row>
    </Form>
  );
};

export default ProfileForm;
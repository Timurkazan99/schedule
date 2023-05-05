import React, {useContext, useEffect} from 'react';
import {Button, Card, Form} from "react-bootstrap";
import {useFormik} from "formik";
import {login} from "../http/userApi";
import {Context} from "../components/ContextProvider.jsx";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {SCHEDULE_ROUTE, FORGOT_PASSWORD_ROUTE} from "../utils/const";
import {batch, useDispatch, useSelector} from "react-redux";
import fetchLocation from "../store/thunks/fetchLocation";
import fetchTemplate from "../store/thunks/fetchTemplate";
import fetchUsers from "../store/thunks/fetchUsers";
import fetchShifts from "../store/thunks/fetchShifts";
import useNotification from "../hooks/useNotification";
import {getActivePeriod} from "../store/selectors";
import Field from "../components/common/Field.jsx";


const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getEventSource = useNotification();
  const {logined, eventSource} = useContext(Context);
  const fromPage = location.state?.from?.pathname || SCHEDULE_ROUTE;
  const period = useSelector(getActivePeriod);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: async (values) => {
      try {
        const {apiKey, ...user} = await login(values.email, values.password);
        logined.setUser(user);
        logined.setIsAuth(true);
        eventSource.setSource(getEventSource(apiKey));
        batch(() => {
          dispatch(fetchLocation());
          dispatch(fetchTemplate());
          dispatch(fetchUsers());
          dispatch(fetchShifts(period));
        })
        navigate(fromPage);
      }
      catch ({response}) {
        if (response.status === 400) {
          formik.setErrors({ email: 'Неверный email или пароль', password: 'Неверный email или пароль' })
        }
      }
    }
  });

  useEffect(() => {
    if (logined.isAuth) {
      navigate(fromPage);
    }
  }, [])

  return (
    <Card className="mx-auto shadow login-form">
      <Card.Header>Авторизация</Card.Header>
      <Card.Body>
        <Form
          id='authForm'
          onSubmit={formik.handleSubmit}
        >
          <Field
            name="email"
            label="Электронная почта"
            className="mb-2"
            formik={formik}
          />
          <Field
            name="password"
            label="Пароль"
            className="mb-2"
            formik={formik}
          />
        </Form>
        <NavLink to={FORGOT_PASSWORD_ROUTE}>Забыли пароль?</NavLink>
      </Card.Body>
      <Card.Footer>
        <Button
          className="w-100"
          variant="success"
          type="submit"
          form='authForm'
        >
          Войти
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default Auth;
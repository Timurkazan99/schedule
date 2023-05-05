import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Button, Card} from "react-bootstrap";
import FormResetPassword from "../components/FormResetPassword.jsx";
import {LOGIN_ROUTE} from "../utils/const";


const ResetPassword = () => {
  const {id, token} = useParams();
  const [send, setSend] = useState(false);
  const navigate = useNavigate();

  return (
    <Card className="mx-auto shadow login-form">
      <Card.Header>Восстановление пароля</Card.Header>
      <Card.Body>
        {
          send ?
            <p>Пароль изменен!</p>
            :
            <FormResetPassword update={setSend} id={id} token={token} />
        }
      </Card.Body>
      <Card.Footer>
        {
          send ?
            <Button
              className="w-100"
              onClick={() => navigate(LOGIN_ROUTE)}
            >
              Авторизоваться
            </Button>
            :
            <Button
              className="w-100"
              variant="success"
              type="submit"
              form="forgotPasswordForm"
            >
              Отправить
            </Button>
        }
      </Card.Footer>
    </Card>
  );
};

export default ResetPassword;
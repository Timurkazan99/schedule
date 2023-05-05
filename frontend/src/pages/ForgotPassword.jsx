import React, {useState} from 'react';
import {Button, Card} from "react-bootstrap";
import FormForgotPassword from "../components/FormForgotPassword.jsx";
import {useNavigate} from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [send, setSend] = useState(false);

  return (
    <Card className="mx-auto shadow login-form">
      <Card.Header>
        Восстановление пароля
      </Card.Header>
      <Card.Body>
        {
          send ?
            <p>Запрос на восстановление отправлен на ваш емайл</p>
            :
            <FormForgotPassword update={setSend} />
        }
      </Card.Body>
      <Card.Footer>
        <div className="d-flex">
          <Button
            className="me-2 flex-grow-1"
            onClick={() => navigate(-1)}
          >
            {'< Назад'}
          </Button>
          <Button
            className="flex-grow-1"
            variant="success"
            type="submit"
            form="forgotPasswordForm"
            disabled={send}
          >
            Отправить
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default ForgotPassword;
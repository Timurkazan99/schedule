import React from 'react';
import {FloatingLabel, Form} from "react-bootstrap";

const DefaultField = (props) => {
  const {className, label, errors, ...newProps} = props;
  return (
    <FloatingLabel
      className={className}
      label={label}
    >
      <Form.Control
        {...newProps}
      />
      { errors && (
        <Form.Control.Feedback type="invalid">
          {errors}
        </Form.Control.Feedback>
      )}
    </FloatingLabel>
  );
};

export default DefaultField;
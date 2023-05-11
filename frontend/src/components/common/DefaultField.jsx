import React from 'react';
import {FloatingLabel, Form} from "react-bootstrap";

const DefaultField = (props) => {
  const {className, label, errors, ...newProps} = props;

  return (
    <FloatingLabel
      className={className}
      label={label}
    >
      {
        props.items ?
          (
            <Form.Select
              placeholder={label}
              {...newProps}
            >
              {
                props.def && (
                  <option
                    value={String(props.def.value)}
                  >
                    {props.def.name}
                  </option>
                )
              }
              {props.items.map((item) => (
                <option
                  key={item.id}
                  value={String(item.id)}
                >
                  {item.name}
                </option>
              ))}
            </Form.Select>
          )
          :
          (
            <Form.Control
              placeholder={label}
              {...newProps}
            />
          )
      }
      <>
      </>
      { errors && (
        <Form.Control.Feedback type="invalid">
          {errors}
        </Form.Control.Feedback>
      )}
    </FloatingLabel>
  );
};

export default DefaultField;
import React from 'react';
import {FloatingLabel, Form} from "react-bootstrap";

const CustomSelect = ({className, label, items, def, ...props}) => {
  return (
    <FloatingLabel
      className={props.className}
      label={props.label}
    >
      <Form.Select
        {...props}
      >
        {
          props?.def && (
            <option
              value={String(props.def.value)}
            >
              {props.def.name}
            </option>
          )
        }
        {items.map((item) => (
          <option
            key={item.id}
            value={String(item.id)}
          >
            {item.name}
          </option>
        ))}
      </Form.Select>
    </FloatingLabel>
  );
};

export default CustomSelect;
import React from 'react';
import {FloatingLabel, Form} from "react-bootstrap";

const CustomSelect = ({className, label, items, def, formik, ...props}) => {
  console.log(def);
  return (
    <FloatingLabel
      className={className}
      label={label}
    >
      <Form.Select
        value={formik.values[props.name]}
        onChange={formik.handleChange}
        {...props}
      >
        {
         def && (
            <option
              value={String(def.value)}
            >
              {def.name}
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
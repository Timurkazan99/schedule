import React from 'react';
import DefaultField from "./DefaultField.jsx";

const DoubleInput = (props) => {
  const {
    name1,
    name2,
    label1,
    label2,
    className1,
    className2,
    formik,
    ...common
  } = props;

  const newProps1 = {
    isInvalid: formik.touched[name1] && formik.errors[name1],
    value: formik.values[name1],
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    errors: formik.errors[name1] || ''
  };

  const newProps2 = {
    isInvalid: formik.touched[name2] && formik.errors[name2],
    value: formik.values[name2],
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    errors: formik.errors[name2] || ''
  };

  return (
    <div className="w-100 d-flex mb-2">
      <DefaultField
        name={name1}
        label={label1}
        className={className1}
        {...newProps1}
        {...common}
      />
      <DefaultField
        name={name2}
        label={label2}
        className={className2}
        {...newProps2}
        {...common}
      />
    </div>
  );
};

export default DoubleInput;
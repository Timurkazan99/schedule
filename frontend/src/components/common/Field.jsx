import React from 'react';
import CustomSelect from "./CustomSelect.jsx";
import EmployeeSelect from "./EmployeeSelect.jsx";
import DaySelect from "./DaySelect.jsx";
import LocationIdInput from "./LocationIdInput.jsx";
import DefaultField from "./DefaultField.jsx";
import DoubleInput from "./DoubleInput.jsx";

const typeMap = {
  select: CustomSelect,
  employee: EmployeeSelect,
  days: DaySelect,
  location: LocationIdInput,
  double: DoubleInput,
}

const Field = (props) => {
  const {type} = props;
  const Component = typeMap[type];

  if (!props.show) {
    return null;
  }

  if (Component) {
    return <Component {...props} />
  }

  const newProps = props.formik ? {
    isInvalid: props.formik.touched[props.name] && props.formik.errors[props.name],
    value: props.formik.values[props.name],
    onChange: props.formik.handleChange,
    onBlur: props.formik.handleBlur,
    errors: props.formik.errors[props.name] || ''
  } : null;

  return <DefaultField {...props} {...newProps} />
};

Field.defaultProps = {
  show: 'true'
};

export default Field;
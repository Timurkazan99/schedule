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
    ...common
  } = props;

  return (
    <div className="w-100 d-flex mb-2">
      <DefaultField
        name={name1}
        label={label1}
        className={className1}
        {...common}
      />
      <DefaultField
        name={name2}
        label={label2}
        className={className2}
        {...common}
      />
    </div>
  );
};

export default DoubleInput;
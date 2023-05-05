import React from 'react';
import Icon from "../Icon.jsx";
import {Button} from "react-bootstrap";

const CustomButton = ({onClick, icon}) => {
  return (
    <Button
      variant="outline-primary"
      className="p-0 border-0"
      style={{lineHeight: '0px', height: '20px', width: '20px', marginTop: '.125em'}}
      onClick={onClick}
    >
      <Icon icon={icon}/>
    </Button>
  );
};

export default CustomButton;
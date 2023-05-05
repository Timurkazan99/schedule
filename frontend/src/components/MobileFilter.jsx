import React from 'react';
import {Dropdown} from "react-bootstrap";
import Icon from "./Icon.jsx";
import CustomMenu from "./common/CustomMenu.jsx";

const MobileFilter = () => {
  return (
    <Dropdown>
      <Dropdown.Toggle
        variant="outline-light"
        className="border-0"
        style={{color: 'black'}}
      >
        <Icon icon='funnel'/>
      </Dropdown.Toggle>
      <Dropdown.Menu as={CustomMenu}/>
    </Dropdown>

  );
};

export default MobileFilter;
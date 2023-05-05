import React from 'react';
import {useAccordionButton} from "react-bootstrap/AccordionButton";

const CustomToggle = ({eventKey, children}) => {
  const decoratedOnClick = useAccordionButton(eventKey);
  return (
      <div
        className="d-flex w-100 justify-content-between px-2 custom-accordion-button"
        onClick={decoratedOnClick}
      >
        {children}
      </div>
  );
};

export default CustomToggle;
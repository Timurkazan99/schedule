import React from 'react';
import MobileMyShifts from "./mobile/MobileMyShifts.jsx";
import DesktopMyShifts from "./desktop/DesktopMyShifts.jsx";
import {Card} from "react-bootstrap";

const MyShifts = ({isAdmin, isMobile, shifts}) => {

  if (isAdmin) {
    return null;
  }
  
  return (
    <Card.Footer>
      {
        isMobile ?
          <MobileMyShifts shifts={shifts}/>
          :
          <DesktopMyShifts shifts={shifts}/>
      }
    </Card.Footer>
  );
};

export default MyShifts;
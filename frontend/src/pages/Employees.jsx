import React, {useContext, useState} from 'react';
import {Card} from "react-bootstrap";
import {Context} from "../components/ContextProvider.jsx";
import EmployeesHeader from "../components/EmployeesHeader.jsx";
import EmployeesTable from "../components/EmployeesTable.jsx";

const Employees = () => {
  const {logined, device} = useContext(Context);
  const [results, setResults] = useState([]);

  return (
    <>
      <Card className="shadow h-100 mx-3 px-1">
        <Card.Header className="d-flex justify-content-between">
          <EmployeesHeader isAdmin={logined.isAdmin} setResults={setResults}/>
        </Card.Header>
        <Card.Body className="w-100 h-100 overflow-auto" >
          <EmployeesTable users={results} isMobile={device.isMobile}/>
        </Card.Body>
      </Card>
    </>
  );
};

export default Employees;
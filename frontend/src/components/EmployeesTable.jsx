import React from 'react';
import DesktopEmployeesTable from "./desktop/DesktopEmployeesTable.jsx";
import MobileEmployeesTable from "./mobile/MobileEmployeesTable.jsx";

const EmployeesTable = ({users, isMobile}) => isMobile ? <MobileEmployeesTable users={users} /> : <DesktopEmployeesTable users={users} />

export default EmployeesTable;
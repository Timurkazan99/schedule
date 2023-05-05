import React from 'react';
import MobileAttendanceTable from "./mobile/MobileAttendanceTable.jsx";
import DesktopAttendanceTable from "./desktop/DesktopAttendanceTable.jsx";

const AttendanceTable = ({table, isMobile}) => isMobile ? <MobileAttendanceTable table={table}/> : <DesktopAttendanceTable table={table}/>

export default AttendanceTable;
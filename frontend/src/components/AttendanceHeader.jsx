import React from 'react';
import MobileAttendanceHeader from "./mobile/MobileAttendanceHeader.jsx";
import DesktopAttendanceHeader from "./desktop/DesktopAttendanceHeader.jsx";

const AttendanceHeader = ({isMobile}) => isMobile ? <MobileAttendanceHeader /> : <DesktopAttendanceHeader />

export default AttendanceHeader;
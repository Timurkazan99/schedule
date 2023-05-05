import React from 'react';
import DesktopScheduleTable from "./desktop/DesktopScheduleTable.jsx";
import MobileSchedule from "./mobile/MobileSchedule.jsx";

const ScheduleTable = ({isMobile}) => isMobile ? <MobileSchedule /> : <DesktopScheduleTable />;

export default ScheduleTable;
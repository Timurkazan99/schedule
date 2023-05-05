import React from 'react';
import MobileLocationTable from "./mobile/MobileLocationTable.jsx";
import DesktopLocationTable from "./desktop/DesktopLocationTable.jsx";

const LocationTable = ({isMobile, locations}) => isMobile ? <MobileLocationTable locations={locations} /> : <DesktopLocationTable locations={locations} />

export default LocationTable;
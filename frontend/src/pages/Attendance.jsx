import React, {useContext, useEffect, useState} from 'react';
import {Card, Spinner} from "react-bootstrap";
import {getPeriod} from "../utils/dates"
import {Context} from "../components/ContextProvider.jsx";
import {useNavigate} from "react-router-dom";
import {SCHEDULE_ROUTE} from "../utils/const";
import AttendanceHeader from "../components/AttendanceHeader.jsx";
import AttendanceTable from "../components/AttendanceTable.jsx";
import {useDispatch} from "react-redux";
import fetchAttendance from "../store/thunks/fetchAttendance";


const Attendance = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const {logined, device} = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (!logined.isAdmin && isLoading) {
      navigate(SCHEDULE_ROUTE);
    }
    const period = getPeriod();
    setIsLoading(false);
    dispatch(fetchAttendance(period[0], period[period.length - 1]));
  }, []);

  if (isLoading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center h-100">
        <span>Loading</span>
        <Spinner animation="grow" />
      </div>
    );
  }

  return (
    <Card className="shadow mx-3 h-100 px-1">
      <Card.Header >
        <AttendanceHeader isMobile={device.isMobile}/>
      </Card.Header>
      <Card.Body className="w-100 h-100 overflow-auto">
        <AttendanceTable isMobile={device.isMobile}/>
      </Card.Body>
    </Card>
  );
};

export default Attendance;
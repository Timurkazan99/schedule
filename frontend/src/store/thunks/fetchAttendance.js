import { createAsyncThunk } from '@reduxjs/toolkit';
import { getResult } from '../../http/attendanceApi';

const thunkAttendance = createAsyncThunk(
  'fetch/attendance',
  ({ startPeriod, endPeriod }) => getResult(startPeriod, endPeriod),
);

export default thunkAttendance;

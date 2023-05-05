import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchLocation } from '../../http/dataApi';

const thunkFetchShifts = createAsyncThunk(
  'fetch/location',
  () => fetchLocation(),
);

export default thunkFetchShifts;

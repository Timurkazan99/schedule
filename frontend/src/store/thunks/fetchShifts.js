import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchShifts } from '../../http/dataApi';

const thunkFetchShifts = createAsyncThunk(
  'fetch/shifts',
  (payload) => {
    const lastIndex = payload.length - 1;
    return fetchShifts(payload[0], payload[lastIndex]);
  },
);

export default thunkFetchShifts;

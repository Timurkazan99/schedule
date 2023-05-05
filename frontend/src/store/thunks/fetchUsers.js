import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUsers } from '../../http/dataApi';

const thunkFetchUsers = createAsyncThunk(
  'fetch/users',
  () => fetchUsers(),
);

export default thunkFetchUsers;

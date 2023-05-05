import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTemplates } from '../../http/dataApi';

const thunkTemplates = createAsyncThunk(
  'fetch/templates',
  () => fetchTemplates(),
);

export default thunkTemplates;

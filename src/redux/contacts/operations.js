import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// const token = useSelector(selectUserToken)

const axiosInstance = axios.create({
  // baseURL: 'https://661e6c4998427bbbef048439.mockapi.io',
  baseURL: 'https://connections-api.herokuapp.com',
  // headers: { Authorization: `Bearer ${token}` },
});
const setAuthHeader = (token = null) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get('/contacts');
      console.log(data);

      setAuthHeader(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue('fetch error');
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async ({ name, number }, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post('/contacts', { name, number });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue('add error');
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      const { data } = await axiosInstance.delete(`/contacts/${contactId}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue('delete error');
    }
  }
);

// export const updateContact = createAsyncThunk(
//   'contacts/updateContact',
//   async (contactId, thunkAPI) => {
//     try {
//       const { data } = await axiosInstance.patch(`/contacts/${contactId}`);
//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue('update error');
//     }
//   }
// );

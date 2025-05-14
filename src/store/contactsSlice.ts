import {createSlice} from '@reduxjs/toolkit';
import {Contact} from '../types';

const initialState: {list: Contact[]} = {
  list: [
    {id: '1', name: 'Mark John'},
    {id: '2', name: 'Ahmed Nabil'},
    {id: '3', name: 'Steve'},
  ],
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
});

export default contactsSlice.reducer;

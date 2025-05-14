import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Contact} from '../types';

const initialState: {list: Contact[]} = {
  list: [],
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setContacts: (state, action: PayloadAction<Contact[]>) => {
      state.list = action.payload;
    },
  },
});

export const {setContacts} = contactsSlice.actions;
export default contactsSlice.reducer;

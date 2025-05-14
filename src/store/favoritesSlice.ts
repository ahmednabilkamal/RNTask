import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Favorite} from '../types';

interface favoriteState {
  list: Favorite[];
}

const initialState: favoriteState = {
  list: [],
};

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Favorite>) => {
      const exists = state.list.find(f => f.id === action.payload.id);
      if (!exists) {
        state.list.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter(f => f.id !== action.payload);
    },
  },
});

export const {addFavorite, removeFavorite} = favoriteSlice.actions;
export default favoriteSlice.reducer;

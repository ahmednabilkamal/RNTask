import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from 'redux';

import contactsReducer from '../store/contactsSlice';
import favoriteReducer from '../store/favoritesSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['favorite'],
};

const rootReducer = combineReducers({
  contacts: contactsReducer,
  favorite: favoriteReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

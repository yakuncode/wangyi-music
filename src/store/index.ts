import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import dateReducer from './modules/date'; // Assuming you have a reducer named dateReducer in modules/date
import userReducer from './modules/user'

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  date: dateReducer,
  user: userReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer
});

export const persistor = persistStore(store);

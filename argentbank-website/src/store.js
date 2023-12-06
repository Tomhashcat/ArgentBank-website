import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger'
import profileReducer from './pages/Users/profileSlice';

const store = configureStore({
  reducer: {
    profile: profileReducer,
    // Ajoutez d'autres réducteurs si nécessaire
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;

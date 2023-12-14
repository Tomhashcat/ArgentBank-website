import { configureStore } from '@reduxjs/toolkit';

import userReducer from './pages/Users/UserSlice';

const store = configureStore({
  reducer: {
   user: userReducer,
   
  },
 
});

export default store;

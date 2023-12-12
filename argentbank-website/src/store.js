import { configureStore } from '@reduxjs/toolkit';

import userReducer from './pages/Users/Userlice';

const store = configureStore({
  reducer: {
   user: userReducer,
   
  },
 
});

export default store;

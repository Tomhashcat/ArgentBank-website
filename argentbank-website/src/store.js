import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./pages/login/authSlice"; 
import profileReducer from './pages/Users/profileSlice'; 
const store = configureStore({
    reducer: {
      auth: authReducer,
      profile: profileReducer,
      // Add other reducers if needed
    },
  });

  export default store;
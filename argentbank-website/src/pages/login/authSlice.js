
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({

  name: 'auth',

  initialState: {
     token: localStorage.getItem('token') || null,
    isLoading: false,
    isAuth: false,
    error: '',
    isRemember: false,},
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
    handleSignIn:(state, action)=>{
      state.token = action.payload; 
    }, logingSuccess: (state) => {
      state.isLoading = false
      state.isAuth = true
      state.error = ''
    },
    logingError: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    logingRemember: (state, action) => {
      state.isRemember = action.payload
    },
    logingOut: (state) => {
      state.isAuth = false
    },
  },
});


export const selectToken = (state) => state.auth.token;
export const {
  setToken,
  clearToken,
  handleSignIn,
  logingSuccess,
  logingError,
  logingOut,
  logingRemember,
} = authSlice.actions;
export default authSlice.reducer;

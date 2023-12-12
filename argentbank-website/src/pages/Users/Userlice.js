import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';


export const loginUser = createAsyncThunk(
  'user/login',
  async (userCredentials) => {
    try {
      const request = await axios.post('http://localhost:3001/api/v1/user/login', userCredentials);
      const response = await request.data.body;
      localStorage.setItem('token', response.token);  // Store the token in local storage
      localStorage.setItem('user', JSON.stringify(response));
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
   
return response;
  } 
);



const userSlice = createSlice({
  name: 'User',

  initialState :{
    isLoading: false,
    user: null,
   
    isRemember: false,
    
    isLogin:false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isRemember=true;
     
          state.isLoading = true;
          state.user= null;
        state.error = null;
        state.isLogin=true;

      })
   
  
  .addCase(loginUser.fulfilled, (state, action) => {
       
        state.isLoading = false;
        state.user=  action.payload;
        state.isRemember=false;
        state.error = true;
        state.isLogin=false;
          })
    
    .addCase(loginUser.rejected,(state,action)=>{
    
      state.isLoading = false;
      state.isRemember=false;
      state.user= null;
      console.log(action.error.message);

      if(action.error.message ==='Request failed with status code 401'){
        state.error= 'Access Denied ! Invalid Credentials';
      }else{
        state.error = action.error.message;
      }
   state.isLogin=false;
    })


  }
});
const { actions, reducer } = userSlice
export const { firstName, lastName, error, isLogin, user, isRemember, isLoading } = userSlice.actions;
export default userSlice.reducer;
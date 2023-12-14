import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const setProfileUserName = (userName) => ({
  type: 'user/setProfileUserName',
  payload: userName,
});
export const loginUser = createAsyncThunk(
  'user/login',
  async (userCredentials, { dispatch }) => {
    try {
      const request = await axios.post('http://localhost:3001/api/v1/user/login', userCredentials);
      const response = request.data.body;
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response));

      dispatch(fetchUserDatas(response.token));
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }
);

export const fetchUserDatas = createAsyncThunk(
  'user/fetchUserDatas',
  async (token, { dispatch }) => {
    try {
      const res = await axios.post(
        'http://localhost:3001/api/v1/user/profile',
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = res;  
      console.log('Profile Response:', data); // Ajoutez cette ligne pour déboguer

      if (data && data.status === 200) {
        const { body } = data;  
        if (body) {
          dispatch(setProfileUserName(body.userName));
          return body;  
        } else {
          throw new Error('Invalid response body');
        }
      } else {
        throw new Error(data ? data.message : 'Invalid response');
      }
    } catch (error) {
      throw error;
    }
  }
);

const UserSlice = createSlice({
  name: 'user',

  initialState: {
    loading: false,
    user: null,
    token: '',
    isRemember: false,
    userName: '',
    isLogin: false,
    error: null,
  },
 
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isRemember = true;
        state.token = '';
        state.loading = true;
        state.user = null;
        state.error = null;
       
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.token = action.payload.token; 
        state.isRemember = false;
        state.error = null;
       
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isRemember = false;
        state.user = null;
        console.log(action.error.message);

        if (action.error.message === 'Request failed with status code 401') {
          state.error = 'Access Denied! Invalid Credentials';
        } else {
          state.error = action.error.message;
        }
       
      })
      .addCase(fetchUserDatas.pending, (state) => {
        state.userName = '';
        state.isLogin = true;
      })
      .addCase(fetchUserDatas.fulfilled, (state, action) => {
       
        console.log('New userName:', action.payload.userName);
        state.userName = action.payload.userName;
        state.isLogin = true;
        state.error = null;
      
      })
  
      .addCase(fetchUserDatas.rejected, (state, action) => {
        state.userName = '';
        state.isLogin = false;
        console.log(action.error.message);

        if (action.error.message === 'Request failed with status code 401') {
          state.error = 'Access Denied! Invalid Credentials';
        } else {
          state.error = action.error.message;
        }
      });
  },
});


const { actions, reducer } = UserSlice;
export const { userName, error, isLogin, user, isRemember, isLoading} = UserSlice.actions;
export default UserSlice.reducer;
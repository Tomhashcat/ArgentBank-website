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

export const fetchUserDatas = createAsyncThunk(
  'user/fetchUserDatas',
  async (token, { dispatch }) => {
    try {
      const res = await axios.post('http://localhost:3001/api/v1/user/profile', null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

    if (res.status >= 200 && res.status < 300) {
      const json = res.data.body;

      if (json.result && json.result.status === 'error') {
        dispatch(errorOccurred(json.result));
        dispatch(logOut());
      } else {
        const userName = json.result.userName;
        dispatch(setUserName(userName));
        
        dispatch(verified(json.result));
      }

      // Vous pouvez également appeler vos actions setProfileUserName et setUserName ici si nécessaire
    } else {
      throw new Error('Échec de la requête avec le code de statut : ' + res.status);
    }
  } catch (error) {
    dispatch(warningOccurred(error.message));
  }
}
);

const userSlice = createSlice({
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
        state.token = action.payload.token; // Mettez à jour la propriété du token ici
        state.isRemember = false;
        state.error = null;
        state.isLogin = true; // Assurez-vous que cette propriété est correctement définie
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
        state.isLogin = false; // Assurez-vous que cette propriété est correctement définie
      })
      .addCase(fetchUserDatas.pending, (state) => {
        state.userName = '';
        state.isLogin = true;
      })
      .addCase(fetchUserDatas.fulfilled, (state, action) => {
        state.userName = action.payload.userName;
        state.isLogin = false;
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

const { actions, reducer } = userSlice;
export const { userName, error, isLogin, user, isRemember, isLoading } = userSlice.actions;
export default userSlice.reducer;

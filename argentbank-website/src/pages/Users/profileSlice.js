
import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    // Votre état initial ici
    firstName: '',
    userName:'',
    lastName: '',
    email:'',
    isRemember: false,
   
    error: null,
    // ... d'autres propriétés
  },
  reducers: {
    // Vos reducers ici
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    }, 
    setEmail: (state, action) => {
      state.email = action.payload;
    }, 
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    logingRemember: (state, action) => {
      state.isRemember = action.payload
    },
   
    profileError: (state, action) => {
      state.error = action.payload;
    },
    setLastName: (state, action) => {
      state.lastName = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    // ... d'autres reducers
  },
});

export const { setFirstName, setLastName, setError,profileError , setUserName, setEmail, logingRemember} = profileSlice.actions;
export default profileSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    // Votre état initial ici
    firstName: '',
    userName:'',
    lastName: '',
    error: null,
    // ... d'autres propriétés
  },
  reducers: {
    // Vos reducers ici
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    }, setUserName: (state, action) => {
      state.userName = action.payload;
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

export const { setFirstName, setLastName, setError,profileError , setUserName} = profileSlice.actions;
export default profileSlice.reducer;
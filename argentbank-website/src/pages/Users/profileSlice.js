
import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    // Votre état initial ici
    firstName: '',
    lastName: '',
    error: null,
    // ... d'autres propriétés
  },
  reducers: {
    // Vos reducers ici
    setFirstName: (state, action) => {
      state.firstName = action.payload;
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

export const { setFirstName, setLastName, setError,profileError } = profileSlice.actions;
export default profileSlice.reducer;
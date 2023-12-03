import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userName: '',
  // Other profile-related state can be added here
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    // Other profile-related reducers can be added here
  },
});

export const { setUserName } = profileSlice.actions;

export default profileSlice.reducer;
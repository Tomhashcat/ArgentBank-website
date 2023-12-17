import { configureStore } from '@reduxjs/toolkit';

import userReducer from './pages/Users/UserSlice';

const store = configureStore({
  reducer: {
   user: userReducer,
   
  },
 
});
const isRememberValue = localStorage.getItem('isRemember');
if (isRememberValue) {
  // Mettre à jour le Redux Store avec la valeur de isRemember
  store.dispatch(setIsRememberAction(JSON.parse(isRememberValue)));
}
export default store;

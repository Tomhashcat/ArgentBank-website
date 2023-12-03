import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./pages/login/authSlice"; // Adjust the path accordingly
import { AuthProvider } from './AuthContext';
import App from './App';
import reportWebVitals from './reportWebVitals';
import profileReducer from './pages/Users/profileSlice'; 
const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    // Add other reducers if needed
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
     
        <AuthProvider>
          <App />
        </AuthProvider>
      
    </Provider>
  </React.StrictMode>,
);

reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import { AuthProvider } from './AuthContext';
import App from './App';
import reportWebVitals from './reportWebVitals';





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

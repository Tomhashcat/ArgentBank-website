
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Header from './components/Header/Header';
import Error from './pages/Error/Error';
import LoginPage from './pages/login/login';
import UserPage from './pages/Users/User';
import "./components/Header/Header.scss";
import { AuthProvider } from './AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/User" element={<UserPage />} />
              <Route path="/*" element={<Error />} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;

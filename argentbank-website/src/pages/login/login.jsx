import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./Login.scss";

import { loginUser } from "../Users/UserSlice";
import "./Login.scss";

export function LoginPage() {
const[email, setEmail]= useState('');
const [password, setPassword] = useState('');


const {loading, error, isRemember}=useSelector((state)=>state.user)
const dispatch= useDispatch();
const navigate= useNavigate();

const handleLoginEvent=(e)=>{
  e.preventDefault();
  let userCredentials= {
    email, password
  }
  dispatch(loginUser(userCredentials)).then((result)=>{
   
      console.log('Login result:', result);
      if (result.payload && result.payload.token) {
        console.log('Login successful!');
        localStorage.setItem('token', result.payload.token);  // Store the token in local storage
        localStorage.setItem('user', JSON.stringify(result.payload));
        setEmail('');
        setPassword('');
        navigate('/User');
      }
    })
    .catch((err) => {
      console.error('Login error:', err);
    });
};
  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleLoginEvent}>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              defaultChecked={isRemember}
              onChange={() => dispatch(isRemember(!isRemember))}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>

          <button type="submit" className="sign-in-button">
            {loading ? "Loading..." : "Sign In"}
          </button>
          {error && (
            <div className="alerte alerte-danger" role="alert">
              {error}
            </div>
          )}
        </form>
      </section>
    </main>
  );
}

export default LoginPage;

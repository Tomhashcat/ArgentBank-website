import React, { useState , useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./Login.scss";

import { loginUser, setIsRememberAction } from "../Users/UserSlice";
import "./Login.scss";


  
  
export function LoginPage() {
  const navigate= useNavigate();
const[email, setEmail]= useState('');
const [password, setPassword] = useState('');
const {loading, error}=useSelector((state)=>state.user);
const [isRemember, setIsRemember] = useState('');
const [token, setToken]=  useState(getToken());
const dispatch= useDispatch();



const handleLoginEvent=(e)=>{
  e.preventDefault();
  let userCredentials= {
    email, password, isRemember
  }

  dispatch(loginUser(userCredentials, isRemember)).then((result)=>{
   
      console.log('Login result:', result);
      if (result.payload && result.payload.token) {

        
        console.log('Login successful!');
       
        setToken(result.payload.token); 
        setEmail('');
        setPassword('');
        navigate('/User');
      }
    })
    .catch((err) => {
      console.error('Login error:', err);
    });
};


function getToken() {
  const [isRemember, setIsRemember] = useState('');
  if (isRemember) {
    const token = localStorage.getItem("token");
    if (token) {
      return navigate("/User");
    }
    return token;
  } else {
    const token = sessionStorage.getItem("token");
    if (token) {
      return navigate("/User");
    }
    return token;
  }
}




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
              checked={isRemember}
              onChange={() => setIsRemember(!isRemember)}
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
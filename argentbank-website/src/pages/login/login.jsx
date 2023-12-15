import React, { useState , useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./Login.scss";

import { loginUser,isRemember, setIsRememberAction,token } from "../Users/UserSlice";
import "./Login.scss";

export function LoginPage() {
  const navigate= useNavigate();
const[email, setEmail]= useState('');
const [password, setPassword] = useState('');
const {loading, error}=useSelector((state)=>state.user);
const localToken = useSelector((state) => state.user.token);


const dispatch= useDispatch();


const handleLoginEvent=(e)=>{
  e.preventDefault();
  let userCredentials= {
    email, password
  }
  dispatch(loginUser(userCredentials)).then((result)=>{
   
      console.log('Login result:', result);
      if (result.payload && result.payload.token) {
        console.log('Login successful!');
       
      
        setEmail('');
        setPassword('');
        navigate('/User');
      }
    })
    .catch((err) => {
      console.error('Login error:', err);
    });
};
const isRemember = useSelector((state) => state.user.isRemember);
const setIsRemember = (value) => dispatch(setIsRememberAction(value));

useEffect(() => {
  console.log("isRemember a changé :", isRemember);
}, [dispatch, isRemember]);
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
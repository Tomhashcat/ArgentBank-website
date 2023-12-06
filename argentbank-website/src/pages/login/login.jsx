import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import { fetchUserDatas } from "../../services/userDatas";
import {setFirstName, setUserName, setProfileLastName,setEmail,setLastName, setIsRemember } from "../Users/profileSlice";
import { useAuth } from "../../AuthContext";
import axios from "axios"; // Assurez-vous d'installer axios : npm install axios
import "./Login.scss";

 // Fonction pour sauvegarder dans le local storage
 const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

// Fonction pour sauvegarder dans le session storage
const saveToSessionStorage = (key, value) => {
  sessionStorage.setItem(key, value);
};

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  const { login } = useAuth();
  
  const dispatch = useDispatch();
  const profileState = useSelector((state) => state.profile);
  const isRemember =  profileState.isRemember;
  const navigate = useNavigate();

  useEffect(() => {
    console.log("isRemember a changé :", isRemember);
  }, [isRemember]);

  useEffect(() => {
    const storedToken = localStorage.getItem('token') || sessionStorage.getItem('token');
  const storedFirstName = localStorage.getItem('firstName') || sessionStorage.getItem('firstName');
  const storedUserName = localStorage.getItem('userName') || sessionStorage.getItem('userName');
  const storedLastName = localStorage.getItem('LastName') || sessionStorage.getItem('LastName');
  const storedEmail = localStorage.getItem('email') || sessionStorage.getItem('email');

  console.log('Stored token:', storedToken);
  console.log('Stored firstName:', storedFirstName);
  console.log('Stored userName:', storedUserName);
  console.log('Stored lastName:', storedLastName);
  console.log('Stored email:', storedEmail);

  if (storedToken && storedFirstName && storedUserName) {
    dispatch(setFirstName(storedFirstName));
   
    dispatch(setLastName(storedLastName));
    dispatch(setEmail(storedEmail));
    dispatch(setUserName(storedUserName));
    

    navigate("/");
  }
  
   
  }, [dispatch, isRemember, navigate]);

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      // Envoyer une requête au serveur pour vérifier les informations d'identification
      const response = await axios.post(
        "http://localhost:3001/api/v1/user/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      // Vérifier si la réponse contient une propriété 'token'
      if (response.status === 200) {

        const { token, firstName, userName } = response.data.body;
        dispatch(fetchUserDatas(token));
        if (isRemember) {
          dispatch(logingRemember(true));
          dispatch(setFirstName(firstName || "")); 
          dispatch(setAuthToken(token));
          dispatch(setFirstName(firstName || ""));
          dispatch(setUserName(userName || "")); 
          saveToLocalStorage('rememberMe', 'true');
          if (userName && firstName) {
            localStorage.setItem('token', token);
            localStorage.setItem('firstName', firstName);
            localStorage.setItem('userName', userName);
            localStorage.setItem('rememberMe', 'true');
          } else {
            console.error('userName ou firstName est indéfini.');
          }
        } else {
          sessionStorage.setItem('token', token);
          sessionStorage.setItem('firstName', firstName);
          sessionStorage.setItem('userName', userName);
        }
        await fetchUserDatas(token);
        login(token);
        navigate("/User");
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
   

  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSignIn}>
          <div className="input-wrapper">
            <label htmlFor="email">email</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          <div className="input-remember">
  <input
    type="checkbox"
    id="remember-me"
    checked={isRemember}
    onChange={() => dispatch(setIsRemember(!isRemember))}
  />
  <label htmlFor="remember-me">Remember me</label>
</div>

          <button type="submit" className="sign-in-button">
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
}

export default LoginPage;

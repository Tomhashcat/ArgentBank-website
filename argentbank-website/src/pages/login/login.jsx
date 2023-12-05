import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import { setToken, logingSuccess, logingError, logingRemember, setFirstName } from "./authSlice";
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
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const dispatch = useDispatch();

  const isRemember = useSelector((state) => state.auth.isRemember);
  const setIsRemember = (value) => dispatch(logingRemember(value));

  useEffect(() => {
    console.log("isRemember a changé :", isRemember);
  }, [isRemember]);

  useEffect(() => {
    const storedToken = localStorage.getItem('token') || sessionStorage.getItem('token');
    const storedFirstName = localStorage.getItem('firstName') || sessionStorage.getItem('firstName');
  
    if (storedToken) {
      dispatch(setToken(storedToken));
    }
  
    if (storedFirstName) {
      dispatch(setFirstName(storedFirstName));
    }
  }, [dispatch]);

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

        const { token } = response.data.body; 
        const {firstName} = response.data.body

        if (isRemember) {
          dispatch(logingRemember(true));
          saveToLocalStorage('token', token);
          saveToLocalStorage('firstName', firstName);
          saveToLocalStorage('rememberMe', 'true');
       ;
        }else {
          saveToSessionStorage('token', token);
          saveToSessionStorage('firstName', firstName);
        }
            
       
        login(token);
        navigate("/User");
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error during login:", error.message);
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
              onChange={() => setIsRemember(!isRemember)}
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

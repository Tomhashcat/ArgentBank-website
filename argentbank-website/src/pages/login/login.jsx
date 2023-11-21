
import { Link,   useNavigate } from "react-router-dom";
import "./Login.scss";
import axios from "axios"; // Assurez-vous d'installer axios : npm install axios
import "./Login.scss";
import React, { useState } from "react";

function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      // Envoyer une requête au serveur pour vérifier les informations d'identification
      const response = await axios.post('http://localhost:3001/api/v1/user/login', {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
       // Vérifier si la réponse contient une propriété 'token'
       if (response.status === 200) {
        const token = response.data.body.token; // Accéder à la propriété token à partir de body
        localStorage.setItem("token", token);
      
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
            <input type="checkbox" id="remember-me" />
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

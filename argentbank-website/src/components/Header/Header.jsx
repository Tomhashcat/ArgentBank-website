import React , { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoImg from "../../assets/img/argentBankLogo.png";
import { useAuth } from "../../AuthContext";
import axios from "axios";
import { setUserName } from "../../pages/Users/profileSlice";
import { useDispatch, useSelector } from "react-redux"; 
/**
 * Component - Header
 * @returns {React.ReactElement} JSX.Element - header component
 */
function Header() {

  const { isLoggedIn, logout, user } = useAuth();
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.profile.userName);

  useEffect(() => {
    if (isLoggedIn && user) {
      // Faites une requête pour obtenir le nom d'utilisateur
      axios.get('/api/user/signup', {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      .then(response => {  console.log("Response Data:", response.data); 
        // Mettez à jour le state avec le nom d'utilisateur récupéré
        dispatch(setUserName(response.data.username));
      })
      .catch(error => {
        console.error('Erreur lors de la récupération du nom d\'utilisateur:', error);
      });
    }
  }, [isLoggedIn, user]);

  console.log("Is Logged In:", isLoggedIn);
  console.log("User:", user);
  console.log("User Name:", userName);
  return (
    <>
      <link rel="stylesheet"  href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
      
       

      <header className="main-nav">
        <Link className="main-navo-log" to="/">
          <img
            className="main-nav-logo-image"
            src={logoImg}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
        {isLoggedIn ? (
          <>
         <Link className="main-nav-item" to="/User">
          <i className="fa fa-user-circle"></i>
          {userName}
        </Link>
            <Link to="/" onClick={logout} className="main-nav-item">
              <i className="fa fa-sign-out"></i>Sign out
            </Link>
            </>
          ) : (
            <Link to="/login" className="main-nav-item">
              <i className="fa fa-user-circle"></i>Sign in
            </Link>
          )}
        </div>
      </header>
    </>
  );
}

export default Header;


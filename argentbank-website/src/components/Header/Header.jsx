import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import { useDispatch, useSelector } from "react-redux";
import { setUserName } from "../../pages/Users/profileSlice";

import logoImg from "../../assets/img/argentBankLogo.png";
import { useAuth } from "../../AuthContext";
import axios from "axios";


/**
 * Component - Header
 * @returns {React.ReactElement} JSX.Element - header component
 */
function Header() {

  const { isLoggedIn, logout, user } = useAuth();
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.profile.userName);


  const handleLogout = () => {
    // Vérifiez si "Remember Me" est coché
  const isRememberMe = localStorage.getItem('rememberMe') === 'true';

  // Si "Remember Me" est coché, efface le token du localStorage, sinon du sessionStorage
  const storage = isRememberMe ? localStorage : sessionStorage;

  // Efface le token du stockage lors de la déconnexion
  localStorage.clear('token');
 localStorage.clear('userName'); // Assurez-vous de supprimer également le nom d'utilisateur
sessionStorage.clear('token');
sessionStorage.clear('userName'); 
  // Déconnecte l'utilisateur
  dispatch(handleLogout());

  
  };
  useEffect(() => {

    const storedToken = localStorage.getItem('accessToken');

    if (storedToken && isLoggedIn) {
      const storedUserName = localStorage.getItem('userName');
  
      if (storedUserName) {
        dispatch(setUserName(storedUserName));
      } else {
        // Dispatch the asynchronous action
        dispatch(fetchUserDatas(storedToken));
      }
    }
  }, [isLoggedIn, user, dispatch]);

  // Gestion du stockage local lors de la déconnexion

  console.log("Is Logged In:", isLoggedIn);

  console.log("userName:", userName);
  return (
    <>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />



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
                {userName ? userName : "Loading..."}
              </Link>
              <Link to="/" onClick={handleLogout} className="main-nav-item">
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


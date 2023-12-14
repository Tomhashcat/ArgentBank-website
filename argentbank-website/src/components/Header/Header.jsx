import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import { useDispatch, useSelector } from "react-redux";
import { user, isLogin,userName, setProfileUserName } from "../../pages/Users/UserSlice";

import logoImg from "../../assets/img/argentBankLogo.png";

import axios from "axios";


/**
 * Component - Header
 * @returns {React.ReactElement} JSX.Element - header component
 */
function Header() {


  const dispatch = useDispatch();



  
  useEffect(() => {

    const storedToken = localStorage.getItem('accessToken');

   

    if (storedToken && isLogin) {
      const storedUser = localStorage.getItem('user');
   const storedUserName = localStorage.getItem('userName');
      if (storedUser) {

        dispatch(setProfileUserName(storedUserName));
      } else {
        // Dispatch the asynchronous action
        dispatch(fetchUserDatas(storedToken));
      }
    }
  }, [isLogin, user, dispatch]);

  // Gestion du stockage local lors de la déconnexion

  console.log("Is Logged In:", isLogin);

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
          {isLogin ? (
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


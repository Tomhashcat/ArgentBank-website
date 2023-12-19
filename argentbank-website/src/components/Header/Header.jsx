import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import {  useSelector, useDispatch} from "react-redux";
import { fetchUserDatas  } from "../../pages/Users/UserSlice";

import logoImg from "../../assets/img/argentBankLogo.png";

import axios from "axios";





/**
 * Component - Header
 * @returns {React.ReactElement} JSX.Element - header component
 */
function Header() {


  const dispatch = useDispatch();
 
  const userName =  useSelector((state) => state.user.userName);
  console.log('UserName in Header:', userName);
  const token = localStorage.getItem('token')||sessionStorage.getItem('token');
  const isRemember = useSelector((state) => state.user.isRemember);

  useEffect(() => {
    // Charger les données de l'utilisateur lorsque le composant est monté
    dispatch(fetchUserDatas(token));
  }, [dispatch, token]);
 
  const handleLogout = () => {
    if(isRemember){
      window.localStorage.clear();
    }else{
      window.localStorage.clear();
        window.sessionStorage.clear();
    }
      
    window.location.reload(true);
    window.location.replace('/');

  };



  
  
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
          {token  ? (
            <>
              <Link className="main-nav-item" to="/User">
                <i className="fa fa-user-circle"></i>
                {userName   ? userName  : "Loading..."}
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


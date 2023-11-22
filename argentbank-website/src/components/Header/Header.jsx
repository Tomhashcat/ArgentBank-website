import React , { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import logoImg from "../../assets/img/argentBankLogo.png";
import { useAuth } from "../../AuthContext";


/**
 * Component - Header
 * @returns {React.ReactElement} JSX.Element - header component
 */
function Header() {

  const { isLoggedIn, logout } = useAuth();


  console.log("Is Logged In:", isLoggedIn);
  
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
            <Link to="/" onClick={logout} className="main-nav-item">
              <i className="fa fa-sign-out"></i>Logout
            </Link>
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


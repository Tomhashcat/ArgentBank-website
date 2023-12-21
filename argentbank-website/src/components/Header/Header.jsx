// Import necessary dependencies from React and other libraries
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserDatas } from "../../pages/Users/UserSlice";

// Import the Argent Bank logo image
import logoImg from "../../assets/img/argentBankLogo.webp";

// Import Axios for making HTTP requests
import axios from "axios";

/**
 * Component - Header
 * @returns {React.ReactElement} JSX.Element - header component
 */
function Header() {
  // Initialize Redux dispatch function
  const dispatch = useDispatch();

  // Retrieve user data from the Redux store using useSelector hook
  const userName = useSelector((state) => state.user.userName);
 

  // Retrieve authentication token from local storage or session storage
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');

  // Check if user chose to be remembered
  const isRemember = useSelector((state) => state.user.isRemember);

  // Use useEffect to dispatch an action to fetch user data when the component mounts or when the token changes
  useEffect(() => {
    if (token) {
      dispatch(fetchUserDatas(token));
    }
  }, [dispatch, token]);

  // Function to handle user logout
  const handleLogout = () => {
    // Clear local storage or session storage based on user's choice
    if (isRemember) {
      window.localStorage.clear();
    } else {
      window.localStorage.clear();
      window.sessionStorage.clear();
    }

    // Reload the page and redirect to the home page
    window.location.reload(true);
    window.location.replace('/');
  };

  return (
    <>
      {/* Link the font-awesome stylesheet */}
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />

      {/* Header component */}
      <header className="main-nav">
        {/* Argent Bank logo and link to home page */}
        <Link className="main-navo-log" to="/">
          <img
            className="main-nav-logo-image"
            src={logoImg}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>

        {/* Conditional rendering based on whether the user is authenticated or not */}
        <div>
          {token ? (
            // Render user-related links if authenticated
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
            // Render sign-in link if not authenticated
            <Link to="/login" className="main-nav-item">
              <i className="fa fa-user-circle"></i>Sign in
            </Link>
          )}
        </div>
      </header>
    </>
  );
}

// Export the Header component as the default export
export default Header;

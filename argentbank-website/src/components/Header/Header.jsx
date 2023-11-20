import React from 'react';
import { Link } from 'react-router-dom';
import "./Header.scss"


/**
 * Component - Header
 * @returns {React.ReactElement} JSX.Element - header component
 */
function Header() {
    
   
    return (

    <header className="main-nav">
        <Link className="main-navo-log" to="/">
            <img
                className="main-nav-logo-image"
                src="./designs/img/argentBankLogo.png"
                alt="Argent Bank Logo"
            />
            <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
            <Link to="/Login" className="main-nav-item" ><i className="fa fa-user-circle"></i>Sign in</Link>
        </div>
    </header>
);

}

export default Header;
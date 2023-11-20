import React from 'react';
import { Link } from 'react-router-dom';



/**
 * Component - Header
 * @returns {React.ReactElement} JSX.Element - header component
 */
function Header() {
    
   
    return (

    <header className="main-nav">
        <a className="main-nav-logo" href="./index.html">
            <img
                className="main-nav-logo-image"
                src="./designs/img/argentBankLogo.png"
                alt="Argent Bank Logo"
            />
            <h1 className="sr-only">Argent Bank</h1>
        </a>
        <div>
            <Link to="/Login" className="main-nav-item" href="./sign-in.html"><i className="fa fa-user-circle"></i>Sign in</Link>
        </div>
    </header>
);

}

export default Header;
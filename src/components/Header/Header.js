import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useState, useEffect } from 'react';


function Header() {
    const location = useLocation();
    const [currentPath, setCurrentPath] = useState(location.pathname);
    return

    <header class="main-nav">
        <a class="main-nav-logo" href="./index.html">
            <img
                class="main-nav-logo-image"
                src="./img/argentBankLogo.png"
                alt="Argent Bank Logo"
            />
            <h1 class="sr-only">Argent Bank</h1>
        </a>
        <div>
            <Link to="/Login" className="main-nav-item" href="./sign-in.html"><i className="fa fa-user-circle"></i>Sign in</Link>
        </div>
    </header>


}

export default Header;
// client/src/components/NavBar.js

import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';
import './NavBar.css';

const Navbar = () => {
    return(
        <div className="navbar-fixed white">
            <nav className="white">
                <div className="nav-wrapper">
                    <Link to="/dialog/show" className="brand-logo" id="text-color"><img className="responsive-img" id="navbar-icon" src={'/img/robot-icon.png'} alt="Language Bot Robot 1" />LangExBot</Link>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><GoogleAuth /></li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;

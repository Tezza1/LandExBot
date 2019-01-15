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
                    <Link to="/show" className="brand-logo" id="text-color"><i className="material-icons" id="text-color">android</i>LangExBot</Link>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><GoogleAuth /></li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;

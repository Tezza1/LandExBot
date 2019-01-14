import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return(
        <div class="navbar-fixed">
            <nav>
                <div class="nav-wrapper">
                    <Link to="/show" class="brand-logo">LangExBot</Link>
                    <ul id="nav-mobile" class="right hide-on-med-and-down">
                        <li><Link to="/show">Dialogs</Link></li>
                        <li><a class="waves-effect waves-light btn">{/*<i class="fab fa-google"></i>*/} Login</a></li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;

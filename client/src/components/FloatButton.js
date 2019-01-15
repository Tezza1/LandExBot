import React from 'react';
import { Link } from 'react-router-dom';

const FloatButton = () => {
    return (
        <div className="fixed-action-btn">
            <a className="btn-floating btn-large waves-effect waves-light lighten-2 red">
                <Link to="/show"><i className="material-icons">textsms</i></Link>
            </a>
        </div>
    );
}

export default FloatButton;

// client/src/components/FloatButton.js

import React from 'react';
import { Link } from 'react-router-dom';

const FloatButton = (props) => {
    return (
        <div className="fixed-action-btn">
            {props.isSignedIn ? (
                <Link to="/dialog/chat" className="btn-floating btn-large waves-effect waves-light lighten-2 red">
                    <i className="material-icons">textsms</i>
                </Link>
                ) : (
                <a href="/" className="btn-floating btn-large disabled">
                    <i className="material-icons">textsms</i>
                </a>
            )}
        </div>
    );
}

export default FloatButton;

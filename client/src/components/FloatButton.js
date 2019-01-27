// client/src/components/FloatButton.js

import React from 'react';
import { Link } from 'react-router-dom';

const FloatButton = (props) => {
    return (
        <div className="fixed-action-btn">
            {/*eslint-disable-next-line*/}
            <a className={`btn-floating btn-large waves-effect waves-light lighten-2 red ${props.action}`}>
                <Link to="/dialog/chat"><i className="material-icons">textsms</i></Link>
            </a>
        </div>
    );
}

export default FloatButton;

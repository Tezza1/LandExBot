// client/src/components/PageTitle.js

import React from 'react';
import PropTypes from 'prop-types';
import './PageTitle.css';

const PageTitle = (props) => {
    return (
        <div className="row" id="header-row">
            <div className="col s12">
                <img className="responsive-img" id="robot-image" src={'/img/robot-icon.png'} alt="Language Bot Robot 2" />
            </div>
            <div className="col s12">
                <h1 className="center-align" id ="red-write-header">{props.title}</h1>
            </div>
        </div>
    );
};

PageTitle.propTypes = {
    title: PropTypes.string.isRequired
};

export default PageTitle;

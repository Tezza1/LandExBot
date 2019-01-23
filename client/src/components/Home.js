// client/src/components/Home.js

import React from 'react';
import './Home.css';

const Home = () => {
    return (
        <div>
            <div className="row">
                <div className="col s6">
                    <img className="responsive-img" id="home_image1" src={'/img/robot-2.png'} alt="Language Bot Robot 1" />
                </div>
                <div className="col s6">
                    <img className="responsive-img" id="home_image2" src={'/img/robot-icon.png'} alt="Language Bot Robot 2" />
                </div>
            </div>
            <div className="row">
                <div className="col s12">
                    <h1 className="center-align" id="red-write" >Language Exchange with a Bot!</h1>
                </div>
            </div>
        </div>
    );
}

export default Home;

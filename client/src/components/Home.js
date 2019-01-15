// client/src/components/Home.js

import React from 'react';
import './Home.css';

const Home = () => {
    return (
        <div>
            <div className="row">
                <div className="col s12">
                    <img className="responsive-img" id="home_image" src={'/img/lang_bots.png'} alt="Language Bot Robots" />
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

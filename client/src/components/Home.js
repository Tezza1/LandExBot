// client/src/components/Home.js

import React from 'react';
import './Home.css';

const Home = () => {
    return (
        <div>
            <div class="row">
                <div class="col s12">
                    <img class="responsive-img" id="home_image" src={'/img/lang_bots.png'} />
                </div>
            </div>
            <div class="row">
                <div class="col s12">
                    <h1 class="center-align red-text">Language Exchange with a Bot!</h1>
                </div>
            </div>
            <div class="fixed-action-btn">
                <a class="btn-floating btn-large waves-effect waves-light red">
                    <i class="material-icons">add</i>
                </a>
            </div>
        </div>
    );
}

export default Home;

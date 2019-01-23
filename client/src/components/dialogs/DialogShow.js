import React, { Component } from 'react';
import './DialogShow.css';

class DialogShow extends Component {
    render() {
        return (
            <div>
                <div className="row" id="header-row">
                    <div className="col s12">
                        <img className="responsive-img" id="robot-image" src={'/img/robot-icon.png'} alt="Language Bot Robot 2" />
                    </div>
                    <div className="col s12">
                        <h1 className="center-align" id ="red-write-header">List Dialogs</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col s6 offset-s3">
                        <div className="row">
                            <div className="col s12 m6">
                               <div className="card">
                                    <div className="card-content">
                                        <span className="card-title red-text">Dialog Name</span>
                                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi harum enim inventore ullam expedita nesciunt ea voluptatem corporis iusto sint?</p>
                                    </div>
                                    <div className="card-action">
                                        <a href="#" className="waves-effect waves-light lighten-2 blue btn left-card-button">Edit</a>
                                        <a href="#" className="waves-effect waves-light lighten-2 red btn">Delete</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col s12 m6">
                                <div className="card">
                                    <div className="card-content">
                                        <span className="card-title red-text">Dialog Name</span>
                                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi harum enim inventore ullam expedita nesciunt ea voluptatem corporis iusto sint?</p>
                                    </div>
                                    <div className="card-action">
                                        <a href="#" className="waves-effect waves-light lighten-2 blue btn left-card-button">Edit</a>
                                        <a href="#" className="waves-effect waves-light lighten-2 red btn">Delete</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default DialogShow;

import React, { Component } from 'react';
import './DialogShow.css';

class DialogShow extends Component {
    constructor(props) {
        super(props);

        this.state = ({
            response: 'Hello'
        })
    }

    componentDidMount() {
        this.callApi()
            .then(res => this.setState({ response: res.express }))
            .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('http://localhost:5000/dialog/show');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };

    /*
    // send data
    handleSubmit = async e => {
        e.preventDefault();
        const response = await fetch('/api/world', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ post: this.state.post }),
        });
        const body = await response.text();
        this.setState({ responseToPost: body });
    };
    */

    render() {
        return (
            <div>
                <div className="row" id="header-row">
                    <div className="col s12">
                        <img className="responsive-img" id="robot-image" src={'/img/robot-icon.png'} alt="Language Bot Robot 2" />
                    </div>
                    <div className="col s12">
                        <h1 className="center-align" id ="red-write-header">Your Dialogs</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12 m6 offset-m3">
                        <div className="row">
                            <div className="col s12 m6">
                               <div className="card">
                                    <div className="card-content">
                                        <span className="card-title red-text">Dialog Name</span>
                                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi harum enim inventore ullam expedita nesciunt ea voluptatem corporis iusto sint?</p>
                                    </div>
                                    <div className="card-action">
                                        {/*eslint-disable-next-line*/}
                                        <a href="#" className="waves-effect waves-light lighten-2 blue btn left-card-button">Edit</a>
                                        {/*eslint-disable-next-line*/}
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
                                        {/*eslint-disable-next-line*/}
                                        <a href="#" className="waves-effect waves-light lighten-2 blue btn left-card-button">Edit</a>
                                        {/*eslint-disable-next-line*/}
                                        <a href="#" className="waves-effect waves-light lighten-2 red btn">Delete</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <p>The data from the backend is: {this.state.response}</p>
                </div>
            </div>
        )
    }
}


export default DialogShow;

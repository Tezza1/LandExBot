// client/src/components/dialogs/DialogShow.js

import React, { Component } from 'react';
import PageTitle from '../PageTitle';
import { Link } from 'react-router-dom';
import './DialogShow.css';

class DialogShow extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            response: [
                {
                    user: '',
                    title: '',
                    description: ''
                }
            ]
        })
    }

    componentDidMount() {
        this.callApi()
            .then(res => {
                this.setState({ response: res.response });
                console.log(res);
            })
            .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('http://localhost:5000/dialogs/show', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: "tshenker@gmail.com" })
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };

    componentDidUpdate(){
        this.user = this.props.userEmail
        console.log(this.user)
    }

    render() {
        const descriptions = this.state.response

        const displayCard = descriptions.map( (el, index) => {
            return (
                <div className="col s12 m6" key={index}>
                   <div className="card small">
                        <div className="card-content">
                            <span className="card-title red-text">{el.title}</span>
                            <p>{el.description}</p>
                        </div>
                        <div className="card-action">
                            <Link to={`/dialog/edit/${el._id}`} className="white-text waves-effect waves-light lighten-2 blue btn card-button">
                                Edit
                            </Link>
                            <Link to={`/dialog/delete/${el._id}`} className="white-text waves-effect waves-light lighten-2 red btn card-button">
                                Delete
                            </Link>
                        </div>
                    </div>
                </div>
            )
        })

        return (
            <div>
                <PageTitle title="Your Dialogs"/>
                <div className="row">
                    <div className="col s12 m6 offset-m3">
                        <div className="row">
                            {displayCard}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DialogShow;

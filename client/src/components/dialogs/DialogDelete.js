// client/src/components/dialogs/DialogEdit.js

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PageTitle from '../PageTitle';

class DialogDelete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userMessage: '',  // the value of whatever the user types into the input field
            conversation: [],  // array that will hold each message in the conversation
            title: '',
            description: ''
        };
    }

    render() {
        return (
            <div>
                <PageTitle title="Dialog Delete"/>
                <div className="row">
                    <div className="col s6 m3 offset-m3">
                        {/*eslint-disable-next-line*/}
                        <a className='btn white red-text waves-effect waves-red top-button'>
                            Delete
                        </a>
                    </div>
                    <div className="col s6 m3">
                        <button className='btn white red-text waves-effect waves-blue top-button'>
                            <Link to="/dialog/show" className="blue-text">Cancel</Link>
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col m6 s12 offset-m3">
                        <div className="row">
                            <div className="col s12 red lighten-4 bb" id="chat-area">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DialogDelete;

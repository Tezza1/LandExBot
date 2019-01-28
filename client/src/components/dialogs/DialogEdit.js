// client/src/components/dialogs/DialogEdit.js

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PageTitle from '../PageTitle';


class DialogEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            conversation: [],
            title: '',
            description: ''
        };
    }

    render() {
        return (
            <div>
                <PageTitle title="Dialog Edit"/>
                <form>
                    <div className="row">
                        <div className="col s6 m3 offset-m3">
                            {/*eslint-disable-next-line*/}
                            <a className='btn white red-text waves-effect waves-blue top-button'>
                                Save
                            </a>
                        </div>
                        <div className="col s6 m3">
                            <button className='btn white red-text waves-effect waves-red top-button'>
                                <Link to="/dialog/show" className="blue-text">Cancel</Link>
                            </button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col m6 s12 offset-m3">
                            <div className="row">
                                <label htmlFor="title">Title</label>
                                <input 
                                    type="text"
                                    name="title"
                                    maxLength="15"
                                    required
                                /> 
                            </div>
                            <div className="row">
                                <label htmlFor="description">Description</label>
                                <input 
                                    type="text"
                                    name="description"
                                    maxLength="50"
                                    required
                                />
                            </div>
                            <div className="row">
                                <div className="col s12 red lighten-4 bb" id="chat-area">

                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default DialogEdit;

// client/src/components/dialogs/DialogChats.js

import React, { Component } from 'react';
import Pusher from 'pusher-js';
import { Link } from 'react-router-dom';
import './DialogChat.css';
import PageTitle from '../PageTitle';


class DialogChat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userMessage: '',  // the value of whatever the user types into the input field
            conversation: [],  // array that will hold each message in the conversation
            title: '',
            description: '',
            userEmail: 'tshenker@gmail.com'
        };
    }

    //  listening for the bot-response event on the bot channel.
    // will the trigger this event on the server and pass the response of the bot through the event payload
    componentDidMount() {
        const pusher = new Pusher('bf71bc7c474fdd2a31a5', {
            cluster: 'ap3',
            encrypted: true,
        });

        const channel = pusher.subscribe('bot');
        channel.bind('bot-response', data => {
            const msg = {
                text: data.message,
                user: 'ai',
            };

            this.setState({
                conversation: [...this.state.conversation, msg],
            });
        });
    }

    // TODO: can delete this
    componentDidUpdate() {

    }

    //  runs on every keystroke to update userMessage
    handleChange = (e) => {
        this.setState({
            userMessage: e.target.value
        });
    };

    // called when the user hits the Enter key.
    // It updates the conversation state & sends data to chat route
    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.state.userMessage.trim()) return;

        const msg = {
            text: this.state.userMessage,
            user: 'human',
        };

        this.setState({
            conversation: [...this.state.conversation, msg],
        });

        fetch('http://localhost:5000/dialogs/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: this.state.userMessage,
            }),
        });

        this.setState({
            userMessage: ''
        });
    };

    handleTitleChange = (e) => {
        this.setState({
            title: e.target.value,
            userEmail: this.props.userEmail
        });
    };

    handleDescChange = (e) => {
        this.setState({
            description: e.target.value
        });
    };

    handleSubmitSave = (e) => {
        e.preventDefault();
        fetch('http://localhost:5000/dialogs/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: this.state.title,
                description: this.state.description,
                text: this.state.conversation,
                userEmail: this.state.userEmail
            })
        });
    }


    render() {

        const ChatBubble = (text, i, className) => {
            return (
                <div key={`${className}-${i}`} className={`${className} chat-bubble`}>
                    <span className="chat-content chip">
                        <img src={'/img/robot-icon.png'}  alt="Icon"/>
                        {text}
                        <i className="close material-icons">close</i>
                    </span>
                </div>
            );
        };

        const chat = this.state.conversation.map((el, index) =>
            ChatBubble(el.text, index, el.user)
        );

        return (
            <div>
                <PageTitle title="LangEx Chat" />
                <div className="row">
                    <div className="col s6 m3 offset-m3">
                        <Link to={`/dialog/show/${this.state.userEmail}`} className='btn white blue-text waves-effect waves-blue top-button'>
                            List Dialogs
                        </Link>
                    </div>
                    <div className="col s6 m3">
                        <button className='btn modal-trigger white red-text waves-effect waves-red top-button' data-target='modal'>
                            Save
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col m6 s12 offset-m3">
                        <div className="row">
                            <div className="col s12 red lighten-4 bb" id="chat-area">
                                {chat}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="input-field">
                                        <input
                                            id="message"
                                            type="text"
                                            value={this.state.userMessage}
                                            onInput={this.handleChange}
                                            autoFocus
                                            placeholder="Enter to send"
                                        />
                                        <label htmlFor="message">Message</label>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="modal" className="modal">
                    <form onSubmit={this.handleSubmitSave}>
                        <div className="modal-content">
                            <h5 className="red-text lighten-2">Dialog details:</h5>
                            <label htmlFor="title">Dialog title:</label>
                            <input
                                placeholder="Enter title"
                                id="dialog_title"
                                type="text"
                                value={this.state.title}
                                onChange={this.handleTitleChange}
                                className="validate"
                                name="title"
                                maxLength="15"
                                required
                            />
                            <label htmlFor="description">Dialog description:</label>
                            <input
                                placeholder="Enter short description"
                                id="dialog_description"
                                type="text"
                                onChange={this.handleDescChange}
                                value={this.state.description}
                                className="validate"
                                name="description"
                                maxLength="50"
                                required
                            />
                        </div>
                        <div className="modal-footer">
                            <button className="waves-effect waves-red btn-flat red-text" type="submit">Save</button>
                            <button className="modal-close waves-effect waves-blue btn-flat blue-text">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default DialogChat;
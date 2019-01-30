// client/src/components/dialogs/DialogChats.js

import React, { Component } from 'react';
import Pusher from 'pusher-js';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
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
            user: 'tshenker@gmail.com',
            toDashboard: false
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

    handleChange2 = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            user: this.props.userEmail
        });
    };

    handleClick = (e) => {
        e.preventDefault();
        fetch('http://localhost:5000/dialogs/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: this.state.title,
                description: this.state.description,
                text: this.state.conversation,
                user: this.state.user
            })
        });

        this.setState({
            toDashboard: true
        });
    }


    render() {
        if (this.state.toDashboard === true) {
            return <Redirect to={`/dialog/show/${this.state.user}`} />
        }

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
                <form onSubmit={this.handleSubmitSave}>
                    <div className="row">
                        <div className="col s6 m3 offset-m3">
                            <Link to={`/dialog/show/${this.state.userEmail}`} className='btn white blue-text waves-effect waves-blue top-button'>
                                List Dialogs
                            </Link>
                        </div>
                        <div className="col s6 m3">
                            <button 
                                className='btn modal-trigger white red-text waves-effect waves-red top-button'
                                onClick={this.handleClick} 
                            >
                                Save
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
                                    value={this.state.title}
                                    onChange={this.handleChange2}
                                />
                            </div>
                            <div className="row">
                                <label htmlFor="description">Description</label>
                                <input
                                    type="text"
                                    name="description"
                                    maxLength="50"
                                    value={this.state.description}
                                    onChange={this.handleChange2}
                                    required
                                />
                            </div>
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
                </form>
            </div>
        );
    }
}

export default DialogChat;
// client/src/components/dialogs/DialogChats.js

import React, { Component } from 'react';
import Pusher from 'pusher-js';
import { Link } from 'react-router-dom';
import './DialogChat.css';


class DialogChat extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
            userMessage: '',  // he value of whatever the user types into the input field
            conversation: [],  // array that will hold each message in the conversation
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
    handleChange = event => {
        this.setState({ userMessage: event.target.value });
    };

    // called when the user hits the Enter key. It updates the conversation state & sends data to chat route
    handleSubmit = event => {
        event.preventDefault();
        if (!this.state.userMessage.trim()) return;

        const msg = {
            text: this.state.userMessage,
            user: 'human',
        };

        this.setState({
            conversation: [...this.state.conversation, msg],
        });

        fetch('http://localhost:5000/dialog/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: this.state.userMessage,
            }),
        });

        this.setState({ userMessage: '' });
    };

    render() {
        const ChatBubble = (text, i, className) => {
            return (
                <div key={`${className}-${i}`} className={`${className} chat-bubble`}>
                    <span className="chat-content chip">
                        <img src={'/img/robot-icon.png'} />
                        {text}
                        <i className="close material-icons">close</i>
                    </span>
                </div>
            );
        };

        const chat = this.state.conversation.map((e, index) =>
            ChatBubble(e.text, index, e.user)
        );

        return (
            <div>
                <div className="row" id="header-row">
                    <div className="col s12">
                        <img className="responsive-img" id="robot-image" src={'/img/robot-icon.png'} alt="Language Bot Robot 2" />
                    </div>
                    <div className="col s12">
                        <h1 className="center-align" id ="red-write-header">LangEx Chat</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col s3 offset-s3">
                        <a className='dropdown-button btn white red-text waves-effect waves-red' href='#' data-activates='menu'>Options <i className="material-icons">arrow_drop_down</i></a>
                        <ul id='menu' className='dropdown-content'>
                            <li>
                                <a>
                                    <i class="material-icons">list_alt</i>
                                    <Link to="/dialog/show">Dialogs</Link>
                                </a>
                            </li>
                            <li>
                                <a href="2_1_typography.html"><i className="material-icons">cloud_upload</i>Save</a>
                            </li>                        
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="col s6 offset-s3">
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
                                            type="text"
                                            autoFocus
                                            placeholder="Enter to send"
                                        />
                                        <label for="message">Message</label>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DialogChat;
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
                        <img src={'/img/robot-icon.png'}  alt="Icon"/>
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
                    <div className="col s6 m3 offset-m3">
                        {/*eslint-disable-next-line*/}
                        <a className='btn white red-text waves-effect waves-blue top-button'>
                            <Link to="/dialog/show">List Dialogs</Link>
                        </a>
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
                                        <label for="message">Message</label>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="modal" className="modal">
                    <form>
                        <div className="modal-content">
                            <h5 className="red-text lighten-2">Dialog title:</h5>
                            <input placeholder="Enter title" id="dialog_title" type="text" className="validate" maxlength="15"/>
                        </div>
                        <div className="modal-footer">
                            <button className="modal-close waves-effect waves-red btn-flat red-text" type="submit">Save</button>
                            <button className="modal-close waves-effect waves-blue btn-flat blue-text">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default DialogChat;
// client/src/components/GoogleAuth.js

import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signIn, signOut } from '../actions';
import './GoogleAuth.css';

class GoogleAuth extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: '',
            email: ''
        };
    }

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '953099900736-lj9picn5rq2qmdnjc8hjnhis8cn06pie.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.authChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.authChange);
            });
        });
    }

    authChange = (isSignedIn) => {

        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.Ab.w3.U3);

            this.setState({
                user: this.auth.currentUser.Ab.w3.ig,
                email: this.auth.currentUser.Ab.w3.U3
            })
        } else {
            this.props.signOut();

            this.setState({
                user: '',
                email: ''
            })
        }

        if(this.props.isSignedIn) {
            fetch('/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: this.state.name,
                    email: this.state.email
                })
            });
        } else {
            /*fetch('/users/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: this.state.name,
                    email: this.state.email
                })
            });*/
        }
    }


    authButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <div>
                    {/*eslint-disable-next-line*/}
                    <a
                        className="waves-effect waves-light lighten-2 red btn-small"
                        onClick={() => this.auth.signOut()}
                    >
                        <i className="material-icons left" id="nav-icon">account_circle</i>
                        Sign out
                    </a>
                </div>
            );
        } else {
            return(
                <div>
                    <Redirect to='/' />
                    {/*eslint-disable-next-line*/}
                    <a
                        className="waves-effect waves-light lighten-2 red btn-small"
                        onClick={() => this.auth.signIn()}
                    >
                        <img className="responsive-img" id="navbar-button-icon" src={'/img/google_logo.png'} alt="Google logo" />
                        Sign in
                    </a>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                {this.authButton()}
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
}

export default connect(mapStateToProps, {
    signIn, signOut
})(GoogleAuth);

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

        };
    }

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '973797215686-9l2ne8tgff2qeqv4pob4dr392au439f9.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.authChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.authChange);
            });
        });
    }

    authChange = (isSignedIn) => {
        // TODO: need this?
        // const userName = this.auth.currentUser.Ab.w3.ig;
        // const userEmail = this.auth.currentUser.Ab.w3.U3;

        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.Ab.w3.U3);
        } else {
            this.props.signOut();
        }

        if(this.props.isSignedIn) {
            fetch('http://localhost:5000/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    // TODO: need this?
                    // name: userName,
                    // email: userEmail
                })
            });
        } else {
            fetch('http://localhost:5000/users/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    // TODO: need this?
                    // name: userName,
                    // email: userEmail
                })
            });
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

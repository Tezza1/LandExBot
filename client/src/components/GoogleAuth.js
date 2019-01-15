import React from 'react';
import './GoogleAuth.css';

class GoogleAuth extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            googleSignedIn: null
        };
    }

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '973797215686-9l2ne8tgff2qeqv4pob4dr392au439f9.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.setState({
                    googleSignedIn: this.auth.isSignedIn.get()
                });
                this.auth.isSignedIn.listen(this.authChange);
            });
        });
    }

    authChange = () => {
        this.setState({
            googleSignedIn: this.auth.isSignedIn.get()
        });
    }

    authButton() {
        if (this.state.googleSignedIn === null) {
            return null
        } else if (this.state.googleSignedIn) {
            return (
                <div>
                    <a
                        className="waves-effect waves-light lighten-2 red btn"
                        onClick={() => this.auth.signOut()}
                    ><i className="material-icons left">person_pin</i>Sign out</a>
                </div>
            );
        } else {
            return(
                <div>
                    <a
                        className="waves-effect waves-light lighten-2 red btn"
                        onClick={() => this.auth.signIn()}
                    ><i className="material-icons left">account_circle</i>Sign in</a>
                </div>
            );
        }
    }

    render() {
        return(
            <div>
                {this.authButton()}
            </div>
        );
    };
}

export default GoogleAuth;

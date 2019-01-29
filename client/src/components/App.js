// client/src/components/App.js

import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Navbar from './Navbar';
import FloatButton from './FloatButton';
import Home from './Home';
import DialogEdit from './dialogs/DialogEdit';
import DialogShow from './dialogs/DialogShow';
import DialogChat from './dialogs/DialogChat';
import DialogDelete from './dialogs/DialogDelete';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <div>
                        <Navbar />
                        <Route path="/" exact component={Home} />
                        <Route path="/dialog/edit/:id" component={DialogEdit} />
                        <Route
                            path="/dialog/show"
                            render={(routeProps) => (<DialogShow {...routeProps} userEmail={this.props.userEmail}/>)}
                        />
                        <Route
                            path="/dialog/chat"
                            render={(routeProps) => (<DialogChat {...routeProps} userEmail={this.props.userEmail}/>)}
                        />
                        <Route path="/dialog/delete/:id" component={DialogDelete} />
                        <FloatButton isSignedIn={this.props.isSignedIn}/>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn,
        userEmail: state.auth.userEmail
    };
}

export default connect(mapStateToProps)(App);

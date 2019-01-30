// client/src/components/App.js

import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Navbar from './Navbar';
import FloatButton from './FloatButton';
import Home from './Home';
import DialogEdit from './dialogs/DialogEdit';
import DialogShow from './dialogs/DialogShow';
import DialogChat from './dialogs/DialogChat';
import DialogDelete from './dialogs/DialogDelete';

const App = (props) => {
    return (
        <div className="App">
            <BrowserRouter>
                <div>
                    <Navbar />
                    <Route path="/" exact component={Home} />
                    <Route path="/dialog/edit/:id" component={DialogEdit} />
                    <Route
                        path="/dialog/show/:id"
                        render={(routeProps) => (<DialogShow {...routeProps} userEmail={props.userEmail}/>)}
                    />
                    <Route
                        path="/dialog/chat/:id"
                        render={(routeProps) => (<DialogChat {...routeProps} userEmail={props.userEmail}/>)}
                    />
                    <Route path="/dialog/delete/:id" component={DialogDelete} />
                    <FloatButton isSignedIn={props.isSignedIn} user={props.userEmail}/>
                </div>
            </BrowserRouter>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn,
        userEmail: state.auth.userEmail
    };
}

export default connect(mapStateToProps)(App);

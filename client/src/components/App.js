// client/src/components/App.js

import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from './Navbar';
import FloatButton from './FloatButton';
import Home from './Home';
import DialogEdit from './dialogs/DialogEdit';
import DialogShow from './dialogs/DialogShow';
import DialogChat from './dialogs/DialogChat';

class App extends Component {
    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <div>
                        <Navbar />
                        <Route path="/" exact component={Home} />
                        <Route path="/dialog/edit" exact component={DialogEdit} />
                        <Route path="/dialog/show" exact component={DialogShow} />
                        <Route path="/dialog/chat" exact component={DialogChat} />
                        <FloatButton />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;

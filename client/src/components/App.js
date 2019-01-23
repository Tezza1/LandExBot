// client/src/components/App.js

import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from './Navbar';
import FloatButton from './FloatButton'
import Home from './Home';
import DialogCreate from './dialogs/DialogCreate';
import DialogEdit from './dialogs/DialogEdit';
import DialogDelete from './dialogs/DialogDelete';
import DialogList from './dialogs/DialogList';
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
                        <Route path="/show" exact component={DialogList} />
                        <Route path="/dialog/new" exact component={DialogCreate} />
                        <Route path="/dialog/edit" exact component={DialogEdit} />
                        <Route path="/dialog/delete" exact component={DialogDelete} />
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

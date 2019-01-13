// server/index.js

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// homepage (not logged in)
app.get('/', (req, res) => {
    res.send(
        'Hello'
    );
});

// list of all conversations
app.get('/dialog', (req, res) => {
    res.send(
        'All conversations'
    );
});

// find a particular conversation
app.get('/dialog/:id', (req, res) => {
    res.send(
        'Find a conversation'
    );
});

// save a conversation
app.post('/dialog', (req, res) => {
    res.send(
        'Save a conversation'
    );
});

// update a particular conversation
app.put('/dialog/:id', (req, res) => {
    res.send(
        'Update a conversation'
    );
});

// delete a particular conversation
app.delete('/dialog/:id', (req, res) => {
    res.send(
        'Delete a conversation'
    );
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
})

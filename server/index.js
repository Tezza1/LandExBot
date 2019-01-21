// server/index.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const gravatar = require('gravatar');

const app = express();

// Load user model
const User = require('./models/User.js');

const mongoDB = require('./config/keys').mongoURI;
mongoose
    .connect(mongoDB)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err))

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// @route       GET /
// @desc        Landing page
// @access      Public
app.get('/', (req, res) => {
    // when login, find the user
    User.findeOne({ email: req.body.email })
        .then(user => {
            if(user) {
                // then get that user info
            } else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200',   // size
                    r: 'pg',    // rating
                    d: 'mm'     // default
                });

                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar
                });

                newUser
                    .save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
            }
        })
});
// @route       GET /
// @desc        List of all conversations
// @access      Private
app.get('/dialog', (req, res) => {
    res.send(
        'All conversations'
    );
});

// @route       GET /
// @desc        Find a particular conversation
// @access      Private
app.get('/dialog/:id', (req, res) => {
    res.send(
        'Find a conversation'
    );
});

// @route       POST /
// @desc        Save a conversation
// @access      Private
app.post('/dialog', (req, res) => {
    res.send(
        'Save a conversation'
    );
});

// @route       PUT /
// @desc        Update a particular conversation
// @access      Private
app.put('/dialog/:id', (req, res) => {
    res.send(
        'Update a conversation'
    );
});

// @route       DELETE /
// @desc        Delete a particular conversation
// @access      Private
app.delete('/dialog/:id', (req, res) => {
    res.send(
        'Delete a conversation'
    );
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
})

// server/index.js

/*----------------------------------------
- login with Google
- send email and name to DB
- if not in DB then register user
- if in DB then get and use the User
-------------------------------------------*/

require('dotenv').config({ path: 'variables.env' });

const express = require('express');
const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
const gravatar = require('gravatar');
const cors = require('cors');
const processMessage = require('./process-message');


const app = express();

// Load user model
const User = require('./models/User.js');


/*
const mongoDB = process.env.MONGO_URI;
mongoose
    .connect(mongoDB)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err))
*/

// Cors
app.use(cors());

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// @route       GET /
// @desc        Landing page
// @access      Public
app.get('/', (req, res) => {
    res.send("hello")
});

app.post('/user/registration', (req, res) => {
        // when login, find the user
    User.findOne({ email: req.body.email })
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
})

// @route       POST /
// @desc        Login User / Returning JWT token
// @access      Public
app.post('/user/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    
    // Find user by email
    User.findOne({email})
        .then(user => {
            // Check for user
            if(!user) {
                return res.status(404).json({email: 'User not found'});
            } else {
                return res.send("User found!")
            }
            
            //
        })
})

// @route       POST /
// @desc        Have a conversation with a bot
// @access      Public
app.post('/dialog/chat', (req, res) => {
    const { message } = req.body;
    processMessage(message);
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

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
})

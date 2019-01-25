const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const gravatar = require('gravatar');

// Load Mongoose Model
require('../models/User');
const User = mongoose.model('users');

router.post('/registration', (req, res) => {
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
router.post('/login', (req, res) => {
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


module.exports = router;
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const gravatar = require('gravatar');

// Load Mongoose Model
require('../models/User');
const User = mongoose.model('users');

// @route       POST /
// @desc        Login User / Returning JWT token
// @access      Public
router.post('/login', (req, res, next) => {
    const email = req.body.email;
    const name = req.body.name;

    User.findOne({ email })
        .then(user => {
            if(user) {
                // then get that user info
                res.json(user)
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
        });
})

router.post('/logout', (req, res) => {
    req.logout();
});


module.exports = router;
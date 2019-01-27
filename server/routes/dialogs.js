const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const processMessage = require('./process-message');

// Load Mongoose Model
require('../models/Dialog');
const Dialog = mongoose.model('dialogs');

// @route       POST /
// @desc        Have a conversation with a bot
// @access      Public
router.post('/chat', (req, res) => {
    const { message } = req.body;
    processMessage(message);
});

// @route       GET /
// @desc        List of all conversations
// @access      Private
router.get('/show', (req, res) => {
    Dialog.find({user: "5c4afc01c561a1265834fc38"})
        .then(dialog => {
            res.send({
                response: dialog
            });
        });
});

// @route       GET /
// @desc        Find a particular conversation
// @access      Private
router.get('/:id', (req, res) => {
    res.send(
        'Find a conversation'
    );
});

// @route       POST /
// @desc        Save a conversation
// @access      Private
router.post('/save', (req, res) => {
    const newDialog = {
            title: req.body.title,
            description: req.body.description,
            text: req.body.text,
            user: req.body.id
        };
        new Dialog(newDialog)
            .save()
            .then(idea => {
                res.redirect('http://localhost:3000/dialog/show');
            });
});

// @route       PUT /
// @desc        Update a particular conversation
// @access      Private
router.put('/:id', (req, res) => {
    res.send(
        'Update a conversation'
    );
});

// @route       DELETE /
// @desc        Delete a particular conversation
// @access      Private
router.delete('/:id', (req, res) => {
    res.send(
        'Delete a conversation'
    );
});


module.exports = router;
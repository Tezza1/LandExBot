const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Load Mongoose Model
require('../models/Dialog');
const Dialog = mongoose.model('dialogs');

// @route       GET /
// @desc        List of all conversations
// @access      Private
router.get('/show/:id', (req, res) => {
    const email = req.params.id;
    Dialog.find({ user: email })
        .then(dialog => {
            res.send({
                response: dialog
            });
        });
});

// @route       GET /
// @desc        Find a particular conversation
// @access      Private
router.get('/find/:id', (req, res) => {
    Dialog.findOne({
        _id: req.params.id
    })
    .then(dialog => {
            res.send({
                response: dialog
            });
        });
});

// @route       POST /
// @desc        Save a conversation
// @access      Private
router.post('/save', (req, res) => {
    const newDialog = {
            title: req.body.title,
            description: req.body.description,
            text: req.body.text,
            user: req.body.user
        };
        new Dialog(newDialog)
            .save()
            .then(dialog => {

            });
});

// @route       PUT /
// @desc        Update a particular conversation
// @access      Private
router.post('/edit/:id', (req, res) => {
    Dialog.findOne({ _id: req.params.id })
        .then(dialog => {
            dialog.title = req.body.title;
            dialog.description = req.body.description;
            dialog.text = req.body.text

           dialog.save()
            .then(() => {

            });

        });
});

// @route       DELETE /
// @desc        Delete a particular conversation
// @access      Private
router.post('/delete/:id', (req, res) => {
    Dialog.deleteOne({ _id: req.params.id })
        .then(() => {

        });
});

module.exports = router;

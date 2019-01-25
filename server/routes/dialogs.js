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
    res.send({
                response: [
                    {
                        user: 'Terry',
                        title: 'Dialog 1',
                        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
                    },
                    {
                        user: 'Terry',
                        title: 'Dialog 2',
                        description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi harum enim inventore ullam expedita nesciunt ea voluptatem corporis iusto sint?'
                    },
                                        {
                        user: 'Terry',
                        title: '',
                        description: ''
                    },
                    {
                        user: 'Terry',
                        title: 'Dialog 2',
                        description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi harum enim inventore ullam expedita nesciunt ea voluptatem corporis iusto sint?'
                    }
                ]
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
            // TODO: fix this
            //user: req.body.id
            //user: req.user.id
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
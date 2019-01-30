// server/models/Dialog.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const DialogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    text: {
        type:  [{
            text : String,
            user : String
        }],
        required: true
    },
    date: {
        type: Date,
        'default': Date.now
    },
});

module.exports = Dialog = mongoose.model('dialogs', DialogSchema);
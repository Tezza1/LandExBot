// server/index.js

require('dotenv').config({ path: 'variables.env' });

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const gravatar = require('gravatar');
const cors = require('cors');
const path = require('path');
const Dialogflow = require('dialogflow');

const app = express();

// Added socket.io
const http = require('http').Server(app);
const io = require('socket.io')(http);

// Load routes
const users = require('./routes/users');
const dialogs = require('./routes/dialogs');

// from Dialogflow agent settings
const projectId = 'newagent-4086c';
const sessionId = '123456';
const languageCode = 'en-US';

const config = {
    credentials: {
        private_key: process.env.DIALOGFLOW_PRIVATE_KEY,
        client_email: process.env.DIALOGFLOW_CLIENT_EMAIL,
    },
};

const sessionClient = new Dialogflow.SessionsClient(config);
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

// use socket to process send and rceivce dialogFlow request and response
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('SEND_MESSAGE', function(data){
        const { message } = data;
        let result = {};

        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: message,
                    languageCode,
                },
            },
        };

        sessionClient
            .detectIntent(request)
            .then(responses => {
                result.message = responses[0].queryResult.fulfillmentText;
                io.emit('RECEIVE_MESSAGE', result);
            })
            .catch(err => {
                console.error('ERROR:', err);
            });

    })
});

// Load user model
const User = require('./models/User.js');
const Dialog = require('./models/Dialog.js');

const mongoDB = process.env.MONGO_URI;
mongoose
    .connect(mongoDB)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


// Cors
app.use(cors());

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use routes
app.use('/users', users);
app.use('/dialogs', dialogs);

// If in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;
http.listen(port, () => {
    console.log(`App running on port ${port}`);
})

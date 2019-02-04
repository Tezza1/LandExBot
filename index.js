// server/index.js

require('dotenv').config({ path: 'variables.env' });

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const gravatar = require('gravatar');
const cors = require('cors');
const path = require('path');
const dialogflow = require('dialogflow');

const app = express();

// Added socket.io
const http = require('http').Server(app);
const io = require('socket.io')(http);

// Load routes
const users = require('./routes/users');
const dialogs = require('./routes/dialogs');

// check config variables have been set
if (!process.env.GOOGLE_PROJECT_ID) {
    throw new Error('missing GOOGLE_PROJECT_ID');
}
if (!process.env.DF_LANGUAGE_CODE) {
    throw new Error('missing DF_LANGUAGE_CODE');
}
if (!process.env.GOOGLE_CLIENT_EMAIL) {
    throw new Error('missing GOOGLE_CLIENT_EMAIL');
}
if (!process.env.GOOGLE_PRIVATE_KEY) {
    throw new Error('missing GOOGLE_PRIVATE_KEY');
}

// from Dialogflow agent settings
const projectId = process.env.GOOGLE_PROJECT_ID;
const sessionId = '123456';
const languageCode = process.env.DF_LANGUAGE_CODE;

const config = {
    credentials: {
        private_key: process.env.GOOGLE_PRIVATE_KEY,
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
    },
};

// const credentials = {
//     client_email: process.env.GOOGLE_CLIENT_EMAIL,
//     // private_key: JSON.parse(process.env.GOOGLE_PRIVATE_KEY),
//     private_key: process.env.GOOGLE_PRIVATE_KEY
// };

// Create a new session
// const sessionClient = new dialogflow.SessionsClient({
//     projectId: process.env.GOOGLE_PROJECT_ID,
//     config
// });

// const sessionPath = sessionClient.sessionPath(
//     process.env.GOOGLE_PROJECT_ID,
//     sessionId
// )

// Create a new session
const sessionClient = new dialogflow.SessionsClient(config);
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

// use socket to process send and rceivce dialogFlow request and response
io.on('connection', (socket) => {
  console.log('a user connected');

    /*// test sample loop
    socket.on('SEND_MESSAGE', function(data){
         io.emit('RECEIVE_MESSAGE', data);
    })*/  

    socket.on('SEND_MESSAGE', function(data){
        const { message } = data;
        let result = {};

        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: message,
                    languageCode: process.env.DF_LANGUAGE_CODE,
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

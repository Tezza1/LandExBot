const Dialogflow = require('dialogflow');
const Pusher = require('pusher');

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

/*const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_APP_KEY,
    secret: process.env.PUSHER_APP_SECRET,
    cluster: process.env.PUSHER_APP_CLUSTER,
    encrypted: true,
});*/

const pusher = new Pusher({
  appId: '703776',
  key: '120793526e77b296017e',
  secret: '6dd62228a8996089fa6c',
  cluster: 'ap3',
  encrypted: true
});

const sessionClient = new Dialogflow.SessionsClient(config);
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

const processMessage = message => {
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
            const result = responses[0].queryResult;

            /*return pusher.trigger('bot', 'bot-response', {
                message: result.fulfillmentText,
            });*/
            pusher.trigger('my-channel', 'my-event', {
                "message": "hello world"
            });

        })
        .catch(err => {
            console.error('ERROR:', err);
        });
};

module.exports = processMessage;

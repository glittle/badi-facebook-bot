const functions = require('firebase-functions');
// const core = require('./fbBadiBot');
const fbShell = require('./facebookShell');

exports.bigben2 = functions.https.onRequest((req, res) => {
    const hours = (new Date().getHours() % 12) + 1 // london is UTC + 1hr;
    console.log(hours, '!')
    res.status(200).send(`<!doctype html>
    <head>
      <title>Time</title>
    </head>
    <body>
    <div>Big Ben 2</div>
      ${'BONG<br>'.repeat(hours)}
    </body>
  </html>`);
});

// Arbitrary value used to validate a webhook
const VALIDATION_TOKEN = process.env.MESSENGER_VALIDATION_TOKEN || 'missing';

exports.webhook = functions.https.onRequest((req, res) => {
    if (req.method === 'GET') {
        if (req.query['hub.mode'] === 'subscribe' &&
            req.query['hub.verify_token'] === VALIDATION_TOKEN) {
            console.log("Validating webhook");
            res.status(200).send(req.query['hub.challenge']);
        } else {
            console.error("Failed validation. Make sure the validation tokens match.");
            res.sendStatus(403);
        }
    }
    else {
        fbShell.handleRequest(req, res)
    }
});

// exports.facebook1 = functions.https.onRequest((req, res) => {
//     if (req.method === 'GET') {
//         core.bot.handleRequest(req, res)
//     }
// });

exports.bigben = functions.https.onRequest((req, res) => {
    const hours = (new Date().getHours() % 12) + 1 // london is UTC + 1hr;
    console.log(hours, '!')
    res.status(200).send(`<!doctype html>
    <head>
      <title>Time</title>
    </head>
    <body>
    <div>Big Ben</div>
      ${'BONG '.repeat(hours)}
    </body>
  </html>`);
});


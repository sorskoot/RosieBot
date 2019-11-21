import tmi from 'tmi.js';

/**
 * @type tmi.Client
 */
let client;

function onMessageHandler(target, context, msg, self) {
    console.log(msg);
    _callback(target, context, msg, self);
}

function connect({ username, password, channel }) {
    client = new tmi.client({
        identity: {
            username: username,//process.dotenv.TWITCH_USERNAME,
            password: password,//process.dotenv.TWITCH_PASSWORD
        },
        channels: [
            channel // process.dotenv.TWITCH_CHANNEL
        ]
    });
    client.on('message', onMessageHandler);
    return new Promise((res, rej) => {
        client.connect()
            .then((data) => {
                // data returns [server, port]
                console.log(`Twitch IRC Connected.`);
                res(data);
            }).catch((err) => {
                console.log(err);
                rej(err);
            });
    })
}
let _callback = function () { };

function setCallback(callback) {
    _callback = callback;
}

export const twitchMessageService = {
    connect,
    setCallback
}
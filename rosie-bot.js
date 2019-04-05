const tmi = require('tmi.js');
require('dotenv').config();

const diceCommand = require('./commands/command-dice');
const rosieCommand = require('./commands/command-rosie');

const opts = {
    identity: {
        username: process.env.TWITCH_USERNAME,
        password: process.env.TWITCH_PASSWORD
    },
    channels: [
        process.env.TWITCH_CHANNEL
    ]
};

const client = new tmi.client(opts);

client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

client.connect()
    .then((data) => {
        // data returns [server, port]
        console.log('connected!');
    }).catch((err) => {
        console.log(err);
    });;

const commands = {
    '!dice': diceCommand,
    '!rosie': rosieCommand
}

function onMessageHandler(target, context, msg, self) {
    if (self) {
        return;
    } // Ignore messages from the bot

    const chatMessage = msg.trim();
    const splitCommand = chatMessage.split(/\s/gi);
    const command = splitCommand[0];

    if (commands.hasOwnProperty(command)) {
        commands[command](client, target, ...splitCommand.splice(1));
    }
}

function onConnectedHandler(addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}
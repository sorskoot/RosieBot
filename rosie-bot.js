const tmi = require('tmi.js');
require('dotenv').config();

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

function onMessageHandler(target, context, msg, self){
    //if (self) { return; } // Ignore messages from the bot
    
    const commandName = msg.trim();

    if (commandName === '!dice') {
        const num = rollDice();
        client.say(target, `You rolled a ${num}`);
        console.log(`* Executed ${commandName} command`);
      } else {
        console.log(`* Unknown command ${commandName}`);
      }
}

function rollDice () {
    const sides = 6;
    return Math.floor(Math.random() * sides) + 1;
  }

function onConnectedHandler(addr, port){
    console.log(`* Connected to ${addr}:${port}`);
}
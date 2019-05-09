const io = require('socket.io-client');
const fs = require('fs');

const file = 'session_most_recent_follower.txt';
const folder = process.env.MUXY_FOLDER;

module.exports =
    (twitchClient, target) => {
        let socket = io('http://localhost:9385');

        socket.on('new follower', function(msg){
            twitchClient.say(target, `Hi @${msg.from_name}! Welcome to the coder-sphere.`);
        });
    }
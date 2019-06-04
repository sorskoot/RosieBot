const io = require('socket.io-client');
const fs = require('fs');
const light = require('../commands/command-light');

module.exports =
    (twitchClient, target) => {
        let socket = io('http://localhost:9385');

        socket.on('new follower', function(msg){
            twitchClient.say(target, `Hi @${msg.name}! Welcome to the coder-sphere.`);
        });

        socket.on('new sub', function(msg){
            light(twitchClient, target,undefined,'yellowhype', true);
        });
    }
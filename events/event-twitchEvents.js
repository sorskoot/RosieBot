const io = require('socket.io-client');
const fs = require('fs');
const light = require('../commands/command-light');
const sfx = require('../commands/command-sfx');
const utils = require('../lib/utils');
const so = require('../commands/command-so');

const voiceMeterVolumeHigh = 80;
const voiceMeterVolumeLow = 40;

module.exports =
    (twitchClient, target) => {
        let socket = io('http://localhost:9385');
        
        socket.on('new follower', function (msg) {
            socket.emit('player', 'volume', 5);
            utils.lerp(voiceMeterVolumeLow, voiceMeterVolumeHigh, 10, 1000, v => sfx.triggerMidi(0xB1, 7, ~~v));
            setTimeout(() => {
                socket.emit('player', 'volume', 100);
                utils.lerp(voiceMeterVolumeHigh, voiceMeterVolumeLow, 10, 1500, v => sfx.triggerMidi(0xB1, 7, ~~v));
                socket.emit('speak', 'text', `Hi, ${msg.name}! Welcome to the coder-sphere!`);
            }, 6000)
            twitchClient.say(target, `Hi @${msg.name}! Welcome to the coder-sphere.`);
        });

        socket.on('new sub', function (msg) {
            socket.emit('player', 'volume', 5);
            utils.lerp(voiceMeterVolumeLow, voiceMeterVolumeHigh, 10, 1500, v => sfx.triggerMidi(0xB1, 7, ~~v));
            setTimeout(() => {
                socket.emit('player', 'volume', 100);
                utils.lerp(voiceMeterVolumeHigh, voiceMeterVolumeLow, 10, 1500, v => sfx.triggerMidi(0xB1, 7, ~~v));
                socket.emit('speak', 'text', `${msg.name}, welcome to our group!`);
            }, 14500)
            light(twitchClient, target, undefined, 'yellowhype', true);
        });

        socket.on('new raid', function (msg) {
            socket.emit('player', 'volume', 5);
            utils.lerp(voiceMeterVolumeLow, voiceMeterVolumeHigh, 10, 1500, v => sfx.triggerMidi(0xB1, 7, ~~v));
            setTimeout(() => {
                socket.emit('player', 'volume', 100);
                utils.lerp(voiceMeterVolumeHigh, voiceMeterVolumeLow, 10, 1500, v => sfx.triggerMidi(0xB1, 7, ~~v));
            }, 15000)
            twitchClient.say(target, `@${msg.name} is raiding with ${msg.raiders} raiders! Defend the coder-sphere!`);
            light(twitchClient, target, undefined, 'greenhype', true);
            setTimeout(() => {
                so(twitchClient, target, undefined, msg.name);
            }, 35000);
        });
        
        function speak(text){
            console.log(`speak:${text}`)
            socket.emit('speak', 'text',text);
        }

        return {
            speak:speak
        }
    }



const io = require('socket.io-client');

let socket = io('http://localhost:9385');

module.exports =
    (emotes) => {
           socket.emit('emotes in chat', emotes);
    }
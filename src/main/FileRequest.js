import socketio from 'socket.io';
import fs from 'fs';

export const fileRequest = {
    start: function (port = 7535) {
        let io = socketio(port, { serveClient: false, origin:"http://localhost:7531/" });
        io.on('connection', socket => {
            let currentSocket = socket;
            socket.on("request-file", path => {
                fs.readFile(path, (err, data) => {
                    if (!err) {
                        let { buffer } = data;
                        currentSocket.emit('file-response', buffer);
                    } else {
                        console.log(err);
                    }
                })
            })
        });
    }
}
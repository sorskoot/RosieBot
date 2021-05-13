import { BrowserWindow, ipcMain } from "electron";
import socketio from 'socket.io';

export const sockets = {
    /**
     * Creates a new WebSockets server and starts listening for messages.
     * It also opens the communication to the render process to communicate
     * with the Vue.js part of the application.
     * @param {number} port The port the websockets server is using
     * @param {BrowserWindow} win The browser window to communicate with over IPC
     */
    start: function (port, win) {
        let io = socketio(port, { serveClient: false, origin:"http://localhost:7531/" });
        
        let sockets = [];
        io.on('connection', socket => {
            sockets.push(socket);

            socket.on("websocket-trigger", (a) => {
                console.log('trigger recieved',a);
                win.send("websocket-trigger", a);
            })

            console.log(`new websocket connection: ${socket.id}, ${socket.handshake.headers.referer}`);
            win.send("websocket-connected", { id: socket.id });
        });

        // When a message comes in from the renderer it is emitted to the 
        // websockets
        ipcMain.on("socket-broadcast", (events, args) => {
            io.emit(args.event, args.args);
        })
    }

}
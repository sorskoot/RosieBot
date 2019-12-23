import http from 'http';
import remoteapp from './app';
import { app, BrowserWindow } from 'electron'

var nodestatic = require('node-static');
var file = new nodestatic.Server(`${__dirname}/bundled`);

let server;
const ipc = require('electron').ipcMain;

export const express = {
    /**
     * 
     * @param {number} port The port to run the webserver on
     * @param {BrowserWindow} win 
     */
    startExpress: function (port, win) {
        http.createServer(function (request, response) {
            new Promise((res, rej) => {
                try {
                    ipc.on("do-test-return", (event, args) => {
                        console.log(args);
                        res(args);
                    });
                    console.log('sending message');
                    win.send("do-test", request.url);
                } catch (e) {
                    rej(e);
                }
            }).then((arg) => {
                response.statusCode = 200;
                response.end(arg);
            }).catch(() => {
                response.statusCode = 500;
                response.end();
            })
        }).listen(port)
    }
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('Listening on ' + bind);

}
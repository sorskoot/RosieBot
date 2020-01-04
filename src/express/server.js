import http from 'http';
import { BrowserWindow, ipcMain } from 'electron'

export const server = {
    /**
     * Starts the webserver to serve content from the renderer
     * @param {number} port The port to run the webserver on
     * @param {BrowserWindow} win 
     */
    start: function (port, win) {
        http.createServer(function (request, response) {
            handleRequest(win, request, response);
        }).listen(port);
    }
}

function handleRequest(win, request, response) {
    new Promise((res, rej) => {
        try {
            if(!!~request.url.indexOf("favicon")){
                res();
                return;
            }
            ipcMain.once("webresponse", (event, args) => {
                //console.log(args);
                res(args);
            });
           // console.log(`sending message for ${request.url}`);
            win.send("webrequest", request.url);
        }
        catch (e) {
            rej(e);
        }
    }).then(arg => {
        response.statusCode = 200;
        response.end(arg);
    }, rejection => {
        response.statusCode = 500;
        response.end(rejection);
    });
}

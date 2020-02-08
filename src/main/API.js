import http from 'http';
import { BrowserWindow, ipcMain } from 'electron';

/**
 * API layer to send and receive data to and from the outside.
 */
export class API {

    /**
     * Instantiates a new API.
     * @param {BrowserWindow} win The browserwindow to communicate to for handling API requests
     * @param {Number} port The port to listen to, defaults to 7533 
     */
    constructor(win, port = 7533) {

        this.port = port;
        this.win = win;

        http.createServer(
            (request, response) => this.handleApiRequest(request, response)
        ).listen(port);
    }

    /**
     * Handles a HTTP request for the server
     * @param {http.IncomingMessage} request 
     * @param {http.ServerResponse} response 
     */
    async handleApiRequest(request, response) {
        try {
            let data = await this.handleRequestData(request);
            let responseData = await this.communicateWithRenderer(data);

            response.writeHead(200, { 'Content-Type': 'application/json', 'Rosie': 'v2.0.0' });
            response.write(JSON.stringify(responseData));
        } catch (e) {
            response.statusCode = 500;
            response.statusMessage = e.message;
        } finally {
            response.end();
        };
    }

    /**
     *  Extracts the data from the incoming request
     *  @param {http.IncomingMessage} request 
     */
    handleRequestData(request) {
        return new Promise((res, rej) => {
            let data = [];
            request.on('data', chunk => {
                data.push(chunk)
            })
            request.on('end', () => {
                res(JSON.parse(data));
            })
        })
    }

    /**
     * Communicate with the renderer sends data and expects some data to return
     * @param {*} data 
     */
    communicateWithRenderer(data) {
        return new Promise((res, rej) => {
            let id = +new Date();
            ipcMain.once(`api-response-${id}`, (event, args) => {
                res(args);
            })
            this.win.send("api-request", { id, data });
        })
    }
}
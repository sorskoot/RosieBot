import { ipcMain, BrowserWindow } from 'electron';
import { get } from 'request';

/**
 * Creates a proxy to use from the client to call cross-domain 
 */
export class WebProxy {

    /**
     * Creates a new instance of the WebProxy
     * @param {BrowserWindow} win 
     */
    constructor(win) {
        this.win = win;
        ipcMain.on('proxy-request', (e, a) => {
            this.handleProxyRequest(a);
        });
    }

    /**
     * Handles the request coming in from the client and does a GET request to
     * the provided url
     * @param {string} url the URL to do the get request to
     */
    handleProxyRequest(url) {
        return new Promise((res) => {
            get(url, (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    res(body);
                } else {
                    res({error});
                }
            });
        }).then(response => this.win.send('proxy-response', response));
    }
}


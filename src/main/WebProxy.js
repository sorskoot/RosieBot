import http from 'http';
import { BrowserWindow, ipcMain, IpcMainEvent, ipcRenderer } from 'electron';
import { get, } from 'request';
export class WebProxy {

    constructor(win) {
        this.win = win;
        ipcMain.on('proxy-request', (e, a) => {
            this.handleProxyRequest(e, a);
        });
    }

    /**
     * 
     * @param {IpcMainEvent} event 
     * @param {*} args 
     */
    handleProxyRequest(event, url) {
        console.log(url);
        return new Promise((res, rej) => {
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


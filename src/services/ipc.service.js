import { ipcRenderer } from 'electron';
import file from 'fs';
import test from '../plugins/page/helloworld';

/**
 *  The IPC Service provides a way of communicating between the Electron Main process 
 *  and the Renderer Process. It is used to serve pages.
 */
class IpcService {

    /**
     * Instantiates a new IPC Sercvices. Subscribes to 
     */
    constructor() {
        ipcRenderer.on("webrequest", (event, arg) => {
            console.log("webrequest");
            console.log(arg);
           //if (arg.endsWith('.html')) {
                fetch(arg).then(x => {
                    x.text().then(d => {
                        // console.log(d);
                        ipcRenderer.send("webresponse", d);
                    });
                }, e => {
                    console.log(e)
                }
                );
            }
        //}
        );
    }
}

export const ipcService = new IpcService();
import { ipcRenderer } from 'electron';

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
            if (/^\/overlay\/[a-zA-Z0-0_\-]+$/g.test(arg)) {
                let page = arg.replace('/overlay/', '');
                fetch(`/overlays/${page}/${page}.json`)
                    .then(r => r.json())
                    .then(m => {
                        ipcRenderer.send("webresponse", { redirect: `/overlay/${page}/${m.index}`});
                    })
            } else {
                let page = arg.replace('/overlay/', '/overlays/');
                fetch(page)
                    .then(x => x.text())
                    .then(d => {
                        console.log(d);
                        ipcRenderer.send(`webresponse-${arg}`, d);
                    });
            }
        });
    }
}

export const ipcService = new IpcService();
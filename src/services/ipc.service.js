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
                        ipcRenderer.send(`webresponse-${arg}`, { redirect: `/overlay/${page}/${m.index}` });
                    })
            } else {
                let page = arg.replace('/overlay/', '/overlays/');
                fetch(page)
                    .then(x => {
                        if (x.url.endsWith('.mp3')) {
                            return x.blob().then(blob => {
                                return new Promise((r) => {
                                    blob = blob.slice(0, blob.size, "audio/mp3")
                                    var reader = new FileReader();
                                    reader.readAsDataURL(blob);
                                    reader.onloadend = function () {
                                        var base64data = reader.result;
                                        r(base64data);
                                    }
                                })
                            });
                        }
                        return x.text()
                    })
                    .then(d => {
                        ipcRenderer.send(`webresponse-${arg}`, d);
                    });
            }
        });

        ipcRenderer.on('api-request',(event,args)=>{
            ipcRenderer.send(`api-response-${args.id}`, {message:'w00t!'});
        });
    }
}

export const ipcService = new IpcService();
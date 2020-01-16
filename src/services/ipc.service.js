import { ipcRenderer } from 'electron';
import Vue from 'vue';
import path from 'path';
import file, { fstat } from 'fs';
import test from '../plugins/pages/helloworld';

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

            let page = arg.replace('/overlay/','');
            let ext = 'html';
            if(page.endsWith('.js')){
                ext='js';
                page = page.replace('.js','');
            }

            //Check external plugin first, use that if it is there.

            fetch(`/overlays/${page}/${page}.${ext}`)
                .then(x => x.text())
                .then(d => ipcRenderer.send("webresponse", d));
            //  }
            // else {
            //     fetch('/views/hello.vue').then(x => {
            //         x.text().then(d => {
            //             ipcRenderer.send("webresponse", d);
            //         });
            //     }, e => {
            //         console.log(e)
            //     });
            // const requireModule = require.context(
            //     '../plugins/pages/',
            //     true,
            //     /^((?!index|\.unit\.).)*\.vue$/
            // )

            // requireModule.keys().forEach((filename) => {
            //     // const moduleDefinition =
            //     //     requireModule(fileName).default || requireModule(fileName)
            //     // let compiled = Vue.compile(moduleDefinition);
            //     // console.log(compiled);
            //     let contents = file.readFileSync(
            //         path.join('../plugins/pages/',filename.slice(2))).toString();
            //     ipcRenderer.send("webresponse", contents);
            // });



            //     }
        });
    }
}

export const ipcService = new IpcService();
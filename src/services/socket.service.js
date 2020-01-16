import EventEmitter from 'events';
import { ipcRenderer } from 'electron';

/**
 * Service for websockets to enable communication between 
 */
class SocketService extends EventEmitter {

    constructor() {
        super();
        this.sockets = [];

        ipcRenderer.on("websocket-connected", (event, arg) => {
            console.log("websocket connected", arg.id);
        });
     }

    /**
     * broadcasts a message to all connected sockets
     * @param {string} event the key to use when emitting
     * @param {object[]} args The message/object to send to all 
     */
    emit(event, ...args){
        ipcRenderer.send("socket-broadcast",{event, args});
    }
}

export default new SocketService();


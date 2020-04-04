import EventEmitter from 'events';


// docs: https://github.com/Palakis/obs-websocket/blob/4.x-current/docs/generated/protocol.md

class ObsService extends EventEmitter {
    constructor() {
        super();
    }

    connect(options) {
        return new Promise((res, rej) => {
            try {
                this.socket = new WebSocket(`ws://localhost:4444`);
                this.socket.addEventListener('message', (e) => this.onMessage(JSON.parse(e.data)));
                this.socket.addEventListener('open', (e) => this.onOpen(e));
                this.socket.addEventListener('error', (e) => this.onError(e));
                // setTimeout(() => {
                //     this.socket.send(JSON.stringify(
                //         {
                //             'message-id': `id-${+new Date()}`,
                //             'request-type': 'SetCurrentScene', 'scene-name': 'Opening'
                //         }
                //     ));
                // }, 5000);
                res(this);
            } catch (e) {
                rej(e);
            }
        });
    }

    send() {

    }

    onMessage(eventData) {
        switch (eventData['update-type']) {
            case 'Heartbeat':

                break;
            case 'SwitchScenes':
                console.log('switching to scene', eventData['scene-name']);
                break;
            case 'TransitionBegin':

                break;
            case 'SceneItemTransformChanged':
                break;
            case 'SwitchTransition':
                break;
            case 'SourceMuteStateChanged':
                console.log(`${eventData.sourceName}:${eventData.muted?'muted':'unmuted'}`)
                break;
            
            default:
                console.log('Message', eventData);
                break;
        }

    }
    onError(eventData) {
        console.error(eventData);
    }
    onOpen(eventData) {
        //console.log('Open', eventData);
    }
}

export default new ObsService();

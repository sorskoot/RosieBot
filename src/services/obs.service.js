import EventEmitter from 'events';
import { decamelize } from '../lib/utils';

// docs: https://github.com/Palakis/obs-websocket/blob/4.x-current/docs/generated/protocol.md

class ObsService extends EventEmitter {
    constructor() {
        super();
        this.scenelist = [];
    }

    connect(options) {
        return new Promise((res, rej) => {
            try {
                this.socket = new WebSocket(`ws://localhost:4444`);
                this.socket.addEventListener('message', (e) => this.onMessage(JSON.parse(e.data)));
                this.socket.addEventListener('open', (e) => {
                    //    this.onOpen(e)
                    this.socket.send(JSON.stringify(
                        {
                            'message-id': `Initial-GetSceneList`,
                            'request-type': 'GetSceneList'
                        }
                    ));
                    res(this);
                });
                this.socket.addEventListener('error', (e) => {
                    rej(e);
                    //this.onError(e);
                });

            } catch (e) {
                rej(e);
            }
        })
    }

    setScene(name) {
        let scene = this.scenelist.find(d => d[name.toLowerCase()]);
        if (scene) {
            name = scene[name.toLowerCase()];
        }

        this.socket.send(JSON.stringify(
            {
                'message-id': `id-${+new Date()}`,
                'request-type': 'SetCurrentScene',
                'scene-name': name
            }
        ));
    }
    setText(target, text) {
        this.socket.send(JSON.stringify(
            {
                'message-id': `id-${+new Date()}`,
                'request-type': 'SetSourceSettings',
                'sourceName': target,
                'sourceSettings': { 'text': text }
            }
        ));
    }
    send() {

    }

    onMessage(eventData) {
        switch (eventData['update-type']) {
            case 'Heartbeat':
            case 'StreamStatus':
            case 'TransitionBegin':
                break;
            case 'SwitchScenes':
                console.log('switching to scene', eventData['scene-name']);
                this.emit('obs-scene-change', eventData['scene-name']);
                break;
            case 'SceneItemTransformChanged':
                break;
            case 'SwitchTransition':
                break;
            case 'SourceMuteStateChanged':
                console.log(`${eventData.sourceName}:${eventData.muted ? 'muted' : 'unmuted'}`)
                break;

            default:

                if (eventData['message-id'] === "Initial-GetSceneList") {
                    this.scenelist = eventData.scenes.map(s => { let obj = {}; obj[decamelize(s.name.replace(/[^a-zA-Z0-9]+/gi, ' '))] = s.name; return obj; });
                    break;
                }
                //console.log('OBS-WSS-Response', eventData);
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

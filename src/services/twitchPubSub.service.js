import EventEmitter from 'events';
import { runInThisContext } from 'vm';
import Store from 'electron-store';

class TwitchPubSubService extends EventEmitter {

    constructor() {
        super();
        let store = new Store();

        this._token = store.get('oauth-token');
        this._url = "wss://pubsub-edge.twitch.tv";
    }

    connect() {
        return new Promise((res, rej) => {
            try {
                this.socket = new WebSocket(this._url);
                this.socket.onopen = (event) => {
                   
                    let message = {
                        type: 'LISTEN',
                        nonce: nonce(15),
                        data: {
                            topics: ["channel-points-channel-v1.77504814"],
                            auth_token: `${this._token}`
                        }
                    };

                    this.socket.send(JSON.stringify(message));

                    this.heartbeat();
                    this.heartbeatHandle = setInterval(()=>this.heartbeat(), 60000);
                }
                
                this.socket.onmessage =  (event,a)=>{
                    let data = JSON.parse(event.data);
                    this.onEvent(data);
                }

                this.socket.onerror  =  (event)=>{
                    console.log('error',event);
                }

                this.socket.onclose  =  (event)=>{
                    console.log('onclose', event);
                }

                res(this);
            } catch (e) {
                rej(e);
            }
        });
    }

    heartbeat() {
        let message = {
            type: 'PING'
        };
        this.socket.send(JSON.stringify(message));
    }

    onEvent(eventData) {
        switch(eventData.type){
            case "PONG":
                console.log('heartbeat...');
                break;
            case "RESPONSE":
                console.log(eventData);
                break;
            case "MESSAGE":

                if(eventData.data.topic.startsWith('channel-points-channel-v1')){
                    let message = JSON.parse(eventData.data.message);
                    this.handleChannelPoints(message.data.redemption);
                }

                break;
            default:
                console.log(eventData);
                break;
        }
    }

    handleChannelPoints(reward){
        this.emit('channel-points',
        {
            type: 'channel-points',
            name:reward.user.display_name,
            reward: reward.reward.title,
            message: reward.user_input
        })
    }
}

function nonce(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

export default new TwitchPubSubService();
import io from 'socket.io-client';
import EventEmitter from 'events';
/*
STREAMLABS_CLIENTID = IuB1m0fvOQSYElXFZHl8R4gs549Ja2km93Myz6G7
STREAMLABS_SECRET = j5eCi1Qgh90ZhOVLtsWv3CBZrv7XIldSq7mPYIBV
STREAMLABS_ACCESS_TOKEN = YsIzftNLLzTcYlBFNiuXII4nxIwuCbHeyh4rDuIM
STREAMLABS_SOCKET_TOKEN = eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbiI6IjFGQ0U4RjRFNkY5RkJEM0U2NjdFIiwicmVhZF9vbmx5Ijp0cnVlLCJwcmV2ZW50X21hc3RlciI6dHJ1ZSwidHdpdGNoX2lkIjoiNzc1MDQ4MTQiLCJtaXhlcl9pZCI6IjI4MDIzMjYwIiwieW91dHViZV9pZCI6IlVDY2U1XzhNbThpb283UEtQc1RQOTN6USJ9.rWt_bhFFw9fn_St78g3wpWgq40QoTIegszxW0zFq038
*/
const STREAMLABS_SOCKET_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbiI6IjFGQ0U4RjRFNkY5RkJEM0U2NjdFIiwicmVhZF9vbmx5Ijp0cnVlLCJwcmV2ZW50X21hc3RlciI6dHJ1ZSwidHdpdGNoX2lkIjoiNzc1MDQ4MTQiLCJtaXhlcl9pZCI6IjI4MDIzMjYwIiwieW91dHViZV9pZCI6IlVDY2U1XzhNbThpb283UEtQc1RQOTN6USJ9.rWt_bhFFw9fn_St78g3wpWgq40QoTIegszxW0zFq038";

/**
 * This class is temporary unit I figure out the correct way of integrating with
 * twitch directly
 */
class StreamlabsService extends EventEmitter {

    constructor() {
        super();
    }

    connect() {
        return new Promise((res, rej) => {
            try {
                this.socket =
                    io(`https://sockets.streamlabs.com?token=${STREAMLABS_SOCKET_TOKEN}`,
                        { transports: ['websocket'] });
                this.socket.on('event', (e) => this.onEvent(e));
                res(this);
            } catch (e) {
                rej(e);
            }
        });
    }

    onEvent(eventData) {
        if (eventData.type == "event") {
            console.log(eventData.payload);
            return;
        }
        if (!eventData.for && eventData.type === 'donation') {
            this.emit('donation', {});
        }
        
        if (eventData.for === 'twitch_account') {
            switch (eventData.type) {
                case 'follow':
                    this.emit('follow', { 
                        type: 'follow',
                        name: eventData.message[0].name });
                    break;
                case 'subscription':
                    this.emit('sub', { type: 'sub' });
                    break;
                case 'raid':
                    this.emit('raid',
                        {
                            type: 'raid',
                            name: eventData.message[0].name,
                            raiders: eventData.message[0].raiders
                        });
                    break;
                default:
                    //default case
                    console.log(eventData);
            }
        }
    }
}

export default new StreamlabsService();
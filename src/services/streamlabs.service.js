import io from 'socket.io-client';
import EventEmitter from 'events';

/**
 * This class is temporary unit I figure out the correct way of integrating with
 * twitch directly
 */
class StreamlabsService extends EventEmitter {

    constructor() {
        super();
    }

    connect(options) {
        return new Promise((res, rej) => {
            try {
                this.socket =
                    io(`https://sockets.streamlabs.com?token=${options.socket_token}`,
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
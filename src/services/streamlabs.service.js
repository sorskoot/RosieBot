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
        this.options = options;
        return new Promise((res, rej) => {
            try {
                //this.socket = new WebSocket()
                this.socket =
                    io(`https://sockets.streamlabs.com?token=${options.socket_token}`,
                        {
                            transports: ["websocket"],
                            autoConnect: true
                        }
                    );
                this.socket.on("connect", () => {
                    console.log(this.socket.id); // x8WIv7-mJelg7on_ALbx
                });

                this.socket.on("disconnect", () => {
                    console.log(this.socket.id); // undefined
                });
                this.socket.on("connect_error", (err) => {
                    console.log(err);
                });
                this.socket.on('event', (e) => this.onEvent(e));
                this.socket.on('error', e => rej);
                this.socket.connect();
                // client-side
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

        /*
            other eventData.type:
                - alertPlaying
        */

        if (!eventData.for && eventData.type === 'donation') {
            this.emit('donation', {});
        }

        if (eventData.for === 'twitch_account') {
            switch (eventData.type) {
                case 'follow':
                    this.emit('follow', {
                        type: 'follow',
                        name: eventData.message[0].name
                    });
                    break;
                case 'host':
                    this.emit('host', {
                        type: 'host',
                        name: eventData.message[0].name,
                        viewers: eventData.message[0].viewers
                    });
                    break;
                case 'sub':
                case 'subscription':
                case 'resub':
                    this.emit('subscription',
                        {
                            type: 'subscription',
                            name: eventData.message[0].name,
                            months: eventData.message[0].months,
                            message: eventData.message[0].message,
                            emotes: eventData.message[0].emotes,
                            sub_plan: eventData.message[0].sub_plan,
                            months: eventData.message[0].months,
                            streak: eventData.message[0].streak_months,
                            gifter: eventData.message[0].gifter
                        });
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

    async getLabels(api_token) {
        let result =
            await fetch(`https://streamlabs.com/api/v5/stream-labels/files?token=${api_token}`)
                .then(d => d.json());

        return result.data;
    }
}

export default new StreamlabsService();
import tmi from 'tmi.js';

/**
 * Options for the connection to Twitch
 * @typedef {object} ConnectionOptions Twitch connection options
 * @property {string} username The username to use to connect to Twitch
 * @property {string} password Password (oauth) to use to connect to Twitch
 * @property {string} channel The channel the bot should listen to
 */

/**
 * Service to work with Twitch Chat.
 */
class TwitchMessageService {

    /**
     * Instantiates a new TwitchMessageService
     */
    constructor() {
        this._callback = () => { };
    }

    /**
     * Called when a new message is entered into chat
     * @param {*} target 
     * @param {*} context 
     * @param {*} msg 
     * @param {*} self 
     */
    onMessageHandler(context, msg, self) {
        this._callback(context, msg, self);
    }

    /**
     * Connect to Twitch
     * @param {ConnectionOptions} options
     */
    connect({ username, password, channel }) {
        this.channel = channel;
        this.client = new tmi.client({
            identity: {
                username: username,//process.dotenv.TWITCH_USERNAME,
                password: password,//process.dotenv.TWITCH_PASSWORD
            },
            channels: [
                channel // process.dotenv.TWITCH_CHANNEL
            ]
        });
        
        this.client.on('subscription',(t, c, m, s)=>{
            console.log(t,c,m,s)
        });

        this.client.on('message', (target, context, msg, self) => this.onMessageHandler(context, msg, self));
        return new Promise((res, rej) => {
            this.client.connect()
                .then((data) => {
                    // data returns [server, port]
                    res(data);
                }).catch((err) => {
                    console.log(err);
                    rej(err);
                });
        })
    }

    /**
     * Sends a IRC message to the Twitch chat
     * @param {string} message message to send to chat
     */
    send(message) {
        this.client.say(this.channel, message);
    }

    /**
     * set the function to call when a message is received
     * @param {function} callback 
     */
    setCallback(callback) {
        this._callback = callback;
    }
}

/**
 * Export a new instance of the Twitch Message Service
 */
export default new TwitchMessageService();

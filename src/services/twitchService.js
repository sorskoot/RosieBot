import tmi from 'tmi.js';


let client;



function onMessageHandler(target, context, msg, self) {
    console.log(msg);
}

function onConnectedHandler(addr, port) {
    //    socketCommands = twitchEvents(client, process.env.TWITCH_CHANNEL);
    //commandCommand.init(commands);
    console.log(`* Connected to ${addr}:${port}`);
    // socketCommands.speak('Hello World! We are good to go.')

}
function connect() {
    client = new tmi.client({
        identity: {
            username: process.env.TWITCH_USERNAME,
            password: process.env.TWITCH_PASSWORD
        },
        channels: [
            process.env.TWITCH_CHANNEL
        ]
    });


    client.on('message', onMessageHandler);
    client.on('connected', onConnectedHandler);

    client.connect()
        .then((data) => {
            // data returns [server, port]
            console.log('connected!');
            console.log(client);
        }).catch((err) => {
            console.log(err);
        });
}
export const twitchService = {
    connect
}
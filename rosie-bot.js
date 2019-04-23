const tmi = require('tmi.js');
require('dotenv').config();

const diceCommand = require('./commands/command-dice');
const rosieCommand = require('./commands/command-rosie');
const CommandsCommand = require('./commands/command-commands');
const sfxCommand = require('./commands/command-sfx');
const socialCommand = require('./commands/command-social');
const lightCommand = require('./commands/command-light');
const uptimeCommand  = require('./commands/command-uptime');

const hypeCommand  = require('./commands/command-hype');

const newFollowerEvent = require('./events/event-new-follower');

const opts = {
    identity: {
        username: process.env.TWITCH_USERNAME,
        password: process.env.TWITCH_PASSWORD
    },
    channels: [
        process.env.TWITCH_CHANNEL
    ]
};

const client = new tmi.client(opts);

client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

client.connect()
    .then((data) => {
        // data returns [server, port]
        console.log('connected!');
    }).catch((err) => {
        console.log(err);
    });;

const commands = {
    '!dice': diceCommand,
    '!rosie': rosieCommand,
    '!commands': CommandsCommand,
    '!hype': hypeCommand,

    '!doh': sfxCommand.sfxDoh,
    '!bingit':sfxCommand.sfxBingit,
    '!fup':sfxCommand.sfxFup,
    '!badumts':sfxCommand.sfxBadumts,
    '!allright':sfxCommand.sfxAllright,
    '!duhduh':sfxCommand.sfxDuhDuhDuuuh,
    '!bye':sfxCommand.sfxBye,
    '!justdoit':sfxCommand.sfxJustDoIt,
    '!dundun':sfxCommand.sfxDunDun,
    '!headshot':sfxCommand.sfxHeadshot,
    '!drumroll':sfxCommand.sfxDrumroll,
    '!inception':sfxCommand.sfxInception,
    '!mclevelup':sfxCommand.sfxMCLevelUp,
    '!mcvillager':sfxCommand.sfxMCVillager,
    '!1up':sfxCommand.sfxMario1up,
    '!finishhim':sfxCommand.sfxFinishHim,
    '!doitlive':sfxCommand.sfxDoItlive,
    '!applause':sfxCommand.sfxApplause,
    '!airhorn':sfxCommand.sfxAirhorn,
    '!laugh':sfxCommand.sfxLaugh,
    '!dingdong':sfxCommand.sfxDingDong,
    '!sonic':sfxCommand.sfxSonic,

    '!twitter': socialCommand.socialTwitter,
    '!youtube': socialCommand.socialYoutube,
    '!discord': socialCommand.socialDiscord,
    '!git': socialCommand.socialGit,
    '!insta': socialCommand.socialInsta,
    '!merch': socialCommand.socialMerch,

    '!light': lightCommand,
    '!uptime': uptimeCommand
}

function onMessageHandler(target, context, msg, self) {
    if (self) {
        return;
    } // Ignore messages from the bot
    
    const chatMessage = msg.trim();
    const splitCommand = chatMessage.split(/\s/gi);
    const command = splitCommand[0];

    if (commands.hasOwnProperty(command)) {
        commands[command](client, target, context, ...splitCommand.splice(1));
    }
}

function onConnectedHandler(addr, port) {    

    newFollowerEvent(client, process.env.TWITCH_CHANNEL);

    console.log(`* Connected to ${addr}:${port}`);
}
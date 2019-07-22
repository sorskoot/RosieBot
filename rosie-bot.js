const tmi = require('tmi.js');
require('dotenv').config();

const diceCommand = require('./commands/command-dice');
const rosieCommand = require('./commands/command-rosie');
const CommandsCommand = require('./commands/command-commands');
const sfxCommand = require('./commands/command-sfx');
const socialCommand = require('./commands/command-social');
const lightCommand = require('./commands/command-light');
const uptimeCommand = require('./commands/command-uptime');
const lurkCommand = require('./commands/command-lurk')
const hypeCommand = require('./commands/command-hype');
const soCommand = require('./commands/command-so');
const infoCommand = require('./commands/command-info');
const spotifyCommand = require('./commands/command-spotify');
const beerCommand = require('./commands/command-beer');
const projectCommand = require('./commands/command-project');
const themeCommand = require('./commands/command-theme');
const commandCommand = require('./commands/command-command');
const blameCommand = require('./commands/command-blame');
const followageCommand = require('./commands/command-followage');
const mutedCommand = require('./commands/command-muted');

const emotesEvent = require('./events/event-emotes');
const twitchEvents = require('./events/event-twitchEvents');
const QnAEvent = require('./events/event-QnA');
const linkEvent = require('./events/event-link');
const timedMessages = require('./events/event-timedMessages');
const voteEvent = require('./events/event-vote');

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
    '!lurk': lurkCommand,
    '!muted': mutedCommand,

    '!doh': sfxCommand.sfxDoh,
    '!bingit': sfxCommand.sfxBingit,
    '!fup': sfxCommand.sfxFup,
    '!badumts': sfxCommand.sfxBadumts,
    '!allright': sfxCommand.sfxAllright,
    '!duhduh': sfxCommand.sfxDuhDuhDuuuh,
    '!bye': sfxCommand.sfxBye,
    '!justdoit': sfxCommand.sfxJustDoIt,
    '!dundun': sfxCommand.sfxDunDun,
    '!headshot': sfxCommand.sfxHeadshot,
    '!drumroll': sfxCommand.sfxDrumroll,
    '!inception': sfxCommand.sfxInception,
    '!mclevelup': sfxCommand.sfxMCLevelUp,
    '!mcvillager': sfxCommand.sfxMCVillager,
    '!1up': sfxCommand.sfxMario1up,
    '!finishhim': sfxCommand.sfxFinishHim,
    '!doitlive': sfxCommand.sfxDoItlive,
    '!applause': sfxCommand.sfxApplause,
    '!airhorn': sfxCommand.sfxAirhorn,
    '!laugh': sfxCommand.sfxLaugh,
    '!dingdong': sfxCommand.sfxDingDong,
    '!sonic': sfxCommand.sfxSonic,
    '!inconceivable': sfxCommand.sfxInconceivable,
    '!mighty': sfxCommand.sfxMighty,
    '!kidding': sfxCommand.sfxKidding,
    '!7days': sfxCommand.sfx7Days,
    '!ding': sfxCommand.sfxDing,
    '!pushit': sfxCommand.sfxPushIt,
    '!howl': sfxCommand.sfxHowl,
    '!rewrite': sfxCommand.sfxRewrite,
    '!kickass': sfxCommand.sfxKickAss,
    '!explode': sfxCommand.sfxExplode,
    '!lovebye': sfxCommand.sfxLoveBye,
    '!goat': sfxCommand.sfxGoat,
    '!findout': sfxCommand.sfxFindout,
    '!asif': sfxCommand.sfxAsIf,
    '!unexceptable': sfxCommand.sfxUnexceptable,
    '!bitemetal': sfxCommand.sfxBiteMetal,
    '!nasty': sfxCommand.sfxNasty,
    '!howdare': sfxCommand.sfxHowDare,
    '!attention': sfxCommand.sfxAttention,
    '!fbi': sfxCommand.sfxFBI,
    '!typing': sfxCommand.sfxTyping,
    '!wholelotta':sfxCommand.sfxWholeLotta,
    '!yourewelcome':sfxCommand.sfxYoureWelcome,
    
    '!twitter': socialCommand.socialTwitter,
    '!youtube': socialCommand.socialYoutube,
    '!discord': socialCommand.socialDiscord,
    '!git': socialCommand.socialGit,
    '!insta': socialCommand.socialInsta,
    '!merch': socialCommand.socialMerch,
    '!setup': socialCommand.socialSetup,

    '!light': lightCommand,
    '!uptime': uptimeCommand,
    '!so': soCommand,

    '!ide': infoCommand.infoIde,
    '!app': infoCommand.infoApp,
    '!geekcode': infoCommand.infoGeekCode,

    '!song': spotifyCommand.spotifySong,

    '!beer': beerCommand,
    '!project': projectCommand,
    '!theme': themeCommand,

    '!command': commandCommand.command,
    '!blame': blameCommand,
    '!followage': followageCommand,

    '!vote': voteEvent.command
}


async function onMessageHandler(target, context, msg, self) {
    if (!!context.emotes) {
        emotesEvent(context.emotes);
    }

    if (self) {
        return;// Ignore messages from the bot
    }

    if (linkEvent.containsLink(msg)) {
        linkEvent.validateLinks(client, target, context, msg);
    }

    if (voteEvent.getIsRunning()) {
        voteEvent.handleVote(msg, context['user-id']);
    }

    if (msg.trim().endsWith("?")) {
        msg = await QnAEvent(client, target, msg);
    };

    timedMessages(client, target);

    try {
        handleBangCommand(msg, target, context);
    } catch (err) {
        console.error(err);
    }

}

function handleBangCommand(msg, target, context) {
    const chatMessage = msg.trim();
    const splitCommand = chatMessage.split(/\s/gi);
    const command = splitCommand[0].toLowerCase();
    if (commands.hasOwnProperty(command)) {
        commands[command](client, target, context, ...splitCommand.splice(1));
    } else {
        if (commandCommand.hasCommand(command)) {
            commandCommand.execute(client, target, context, command, splitCommand.splice(1).join(' '));
        }
    }
}

function onConnectedHandler(addr, port) {
    twitchEvents(client, process.env.TWITCH_CHANNEL);

    commandCommand.init(commands);
    console.log(`* Connected to ${addr}:${port}`);
}
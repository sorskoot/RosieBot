const request = require('request');

const URL = "https://twitch.c0dr.nl:9384/player/current-song";

module.exports =
    (twitchClient, target, context) => {
        request.get(URL,
            (err, resp, body) => {
                if (err) {
                    return;
                }
                let trackinfo = JSON.parse(body);
                twitchClient.say(target, `The current song playing is '${trackinfo.title}' by ${trackinfo.artist}.`);
            })
    }

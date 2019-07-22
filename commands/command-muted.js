const light = require('./command-light');
const sfx = require('./command-sfx');

module.exports =
    (twitchClient, target, context) => {
        twitchClient.say(target, `HEY @sorskoot! YOU ARE MUTED!`);
        light(twitchClient, target, context, 'redhype', true);
        sfx.sfxAttention();
    }
const light = require('../commands/command-light');

module.exports = (client, channel, username, viewers) => {
    client.say(channel, `@${username} is raiding with ${viewers} viewers! Defend the coder-sphere!`);
    light(client, channel,undefined,'greenhype', true);
};
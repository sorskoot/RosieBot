const lightCommand = require('./command-light');

module.exports =
    (twitchClient, target, context) => {        
        var hearts = new Array(16).fill('<3 TwitchLit').join(' ');
        
        lightCommand(twitchClient, target,context,"purple", true);

        twitchClient.say(target,hearts);
   
    }
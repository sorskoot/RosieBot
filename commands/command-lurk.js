module.exports =
    (twitchClient, target, context) => {        
        twitchClient.say(target,`Just sit back @${context['display-name']} and lurk, Rosie will take care of you.`);
    }
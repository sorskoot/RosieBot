let currentProject;

module.exports =
    (twitchClient, target, context,...rest) => {
        if(!!rest.length && context.badges.hasOwnProperty("broadcaster")){
            currentProject = rest.join(' ');
            return;
        }

        if(!!currentProject){
            twitchClient.say(target,`Sorskoot is working on ${currentProject}.`);
        }else{
            twitchClient.say(target,`Sorskoot is probably working on something?! Hey, @Sorskoot, what are you doing!`);
        }
    }
let currentBeer;

module.exports =
    (twitchClient, target, context, ...rest ) => {
        
        if(!!rest.length && context.badges.hasOwnProperty("broadcaster")){
            currentBeer = rest.join(' ');
            return;
        }

        if(!currentBeer){
            twitchClient.say(target,`Sorkoot isn't drinking any beers today.`);
        }else{
            twitchClient.say(target,`Sorskoot is drinking a ${currentBeer}.`);
        }
    };

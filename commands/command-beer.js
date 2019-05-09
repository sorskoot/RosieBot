const currentBeer = 'Kaapse Brouwers - Karel';

module.exports =
    (twitchClient, target, context) => {
        twitchClient.say(target,`Sorskoot is drinking a ${currentBeer}.`);
    };

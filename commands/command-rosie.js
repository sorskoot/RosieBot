module.exports =
    (twitchClient, target) => {
        let value = Math.floor(Math.random() * quotes.length -1);
        let quote = quotes[value];
        twitchClient.say(target, quote);
    }

    const quotes = [
        'You betcha mister J!',
        'Quiet down shorty!',
        'I demand a recount!',
        'Never fear while Rosie\'s here!',
        'I swear on my mother\'s rechargable batteries.',
        'The opinions expressed are my own and do not necessarily reflect those of my employers.'
    ];
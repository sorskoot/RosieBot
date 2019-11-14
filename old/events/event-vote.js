
let isRunning = false;
let voteOptions = [];
let votes = {};
let hasVoted = [];

module.exports = {
    command: (twitchClient, target, context, duration, ...options) => {
        if(!context.badges.broadcaster){
            return;
        }
        if (!duration || !+duration) return;

        if (options && options.length > 0) {
            voteOptions = options;
            for (let index = 0; index < options.length; index++) {
                votes[options[index]] = 0;
            }
            twitchClient.say(target,`Voting has started and will run for ${duration}s. Options are ${voteOptions.join(', ')}.`);
        } else {
            voteOptions = [...Array(10).keys()].map(k => `${k + 1}`);
            twitchClient.say(target,`Voting has started and will run for ${duration}s.`);
        }
        
        hasVoted = new Array();
        isRunning = true;
        setTimeout(() => {
            isRunning = false;
            let results = Object.entries(votes);
            results.sort((a, b) => b[1] - a[1]);
            if (results[0][1] === 0) {
                twitchClient.say(target, `Come on Chat! We're trying to make a decision here!`);
                return;
            }
            twitchClient.say(target, `Voting ended. ${results[0][0]} won with ${results[0][1]} vote${results[0][1] > 1 ? 's' : ''}.`);
        }, duration * 1000);
    },

    getIsRunning: () => {
        return isRunning;
    },

    handleVote: (message, userId) => {
        if (!!~voteOptions.indexOf(message) && !~hasVoted.indexOf(userId)) {
            votes[message] ? votes[message]++ : votes[message] = 1;
            hasVoted.push(userId);
        }
    }
}
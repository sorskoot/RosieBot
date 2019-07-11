
const blameTargets =
    ['the weather', 'Trump', 'Twitch', 'the boogie', 'trolls', 'global warming'];
const blameReason =
    ['slow internet', 'the long chat lag', 'the rain'];

module.exports =
    (twitchClient, target, context, blameTarget, ...reasonWords) => {
        if (!blameTarget) {
            blameTarget = blameTargets[~~(Math.random() * blameTargets.length)];
        }
        let reason;
        if (!reasonWords || reasonWords.length == 0) {
            reason = blameReason[~~(Math.random() * blameReason.length)]
        } else {
            reason = reasonWords.join(' ');
        }

        twitchClient.say(target, `@${context['display-name']} is blaming ${blameTarget} for ${reason}!`);

    }
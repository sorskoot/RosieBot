module.exports =
    (twitchClient, target,context, numberOfRolls = 1, numberOfSides = 6) => {
        if (numberOfRolls < 1) {
            numberOfRolls = 1;
        }
        if (numberOfSides < 1) {
            numberOfSides = 6;
        }
        const num = rollDice(numberOfRolls, numberOfSides);
        twitchClient.say(target, `You rolled an average of ${num}.`);
    }

function rollDice(numberOfRolls, numberOfSides) {
    let total = 0;
    for (let i = 0; i < numberOfRolls; i++) {
        total += Math.floor(Math.random() * numberOfSides) + 1;
    }
    return total / numberOfRolls;
}
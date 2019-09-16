let words = require('./data/words');
let wordToGuess = randomWord();

let correctLetters = [];
let incorrectLetters = [];

let numberOfMistakesLeft = 10;

module.exports =
    (twitchClient, target, context, guess) => {
        if (!guess) {
            if (!correctLetters.length && !incorrectLetters.length) {
                twitchClient.say(target, `Guess the ${wordToGuess.length} letter word. `);
            } else {
                sayCurrentState(twitchClient, target);
            }
            // return current state
        } else if (!!guess.match(/^[a-zA-Z]$/gm)) {
            guess = guess.toUpperCase();
            if (!!~correctLetters.indexOf(guess) || !!~incorrectLetters.indexOf(guess)) {
                twitchClient.say(target, `You've already guessed ${guess}!`);
            } else {
                if (!!~wordToGuess.indexOf(guess)) {
                    correctLetters.push(guess);
                    if (!~generateState().indexOf('_')) {
                        twitchClient.say(target, `Yeah! @${context['display-name']}, you've guessed the word: ${wordToGuess}!`);
                        reset();
                    } else {
                        sayCurrentState(twitchClient, target);
                    }
                } else {
                    twitchClient.say(target, `${guess} is not in the word.`);
                    incorrectLetters.push(guess);
                    numberOfMistakesLeft--;
                    if (numberOfMistakesLeft == 0) {
                        twitchClient.say(target, `You hang! The word was ${wordToGuess}`);
                        reset();
                    } else {
                        sayCurrentState(twitchClient, target);
                    }
                }
            }
        } else {
            twitchClient.say(target, `Only single letters are allowed.`);
        }
    }

function reset() {
    wordToGuess = randomWord();
    correctLetters = [];
    incorrectLetters = [];
    numberOfMistakesLeft = 10;
}

function sayCurrentState(twitchClient, target) {
    twitchClient.say(target, `${generateState()}. ${numberOfMistakesLeft} mistakes left. Letters guessed: ${incorrectLetters.join(', ')}`);
}

function generateState() {
    //'A _ _ L E _'
    let state = [];
    for (let i = 0; i < wordToGuess.length; i++) {
        if (!!~correctLetters.indexOf(wordToGuess[i])) {
            state.push(wordToGuess[i].toUpperCase());
        } else {
            state.push('_');
        }
    }
    return state.join(' ');
}

function randomWord(){
    return words[~~Math.random()*words.length].toUpperCase();
}
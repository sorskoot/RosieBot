const request = require('request');
const converter = require('@q42philips/hue-color-converter');
const colors = require('./data/colors');

module.exports =
    (twitchClient, target, context, color, silent = false) => {
        if(!color){
            if(!silent) twitchClient.say(target,`Sorry @${context['display-name']}, you have to specify a color.`)
        }
        else if (color in colors) {
            changeLightColor(color).then(c => {
                if(!silent) twitchClient.say(target,`@${context['display-name']} just changed the light to '${color}'.`)
            })
        }else{
            if(!silent) twitchClient.say(target,`Sorry @${context['display-name']}, I don't know the color '${color}'.`)
        }
    }

function changeLightColor(color, transitiontime = 10) {
    let R = parseInt(colors[color].substr(1, 2), 16);
    let G = parseInt(colors[color].substr(3, 2), 16);
    let B = parseInt(colors[color].substr(5, 2), 16);

    return changeLightRGB(R, G, B, transitiontime);
}

function changeLightRGB(R, G, B, transitiontime) {
    let xy = converter.calculateXY(R, G, B);
    const state = {
        on: true,
        xy: xy,
        transitiontime: transitiontime
    };
    return new Promise((res, rej) => request.put(`${process.env.HUE_URL}/lights/17/state`, {
        json: state
    }, function (error, response, body) {
        if (!!error) {
            rej(error);
        }
        res(body);
    }));
}

const request = require('request');
const converter = require('@q42philips/hue-color-converter');
const colors = require('./data/colors');

module.exports =
    (twitchClient, target, context, color) => {
        if(!color){
            twitchClient.say(target,`Sorry @${context['display-name']}, you have to specify a color.`)
        }
        else if (color in colors) {
            changeLightColor(color).then(c => {
                twitchClient.say(target,`@${context['display-name']} just changed the light to '${color}'.`)
            })
        }else{
            twitchClient.say(target,`Sorry @${context['display-name']}, I don't know the color '${color}'.`)
        }
    }

function changeLightColor(color) {
    let R = parseInt(colors[color].substr(1, 2), 16);
    let G = parseInt(colors[color].substr(3, 2), 16);
    let B = parseInt(colors[color].substr(5, 2), 16);

    let xy = converter.calculateXY(R, G, B);

    const state = {
        on: true,
        xy: xy

    }
    return new Promise((res, rej) =>
        request.put(`${process.env.HUE_URL}/lights/17/state`, {
                json: state
            },
            function (error, response, body) {
                if(!!error){
                    rej(error);
                }
                res(body);
            })
    );
}
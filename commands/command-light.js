const request = require('request');
const converter = require('@q42philips/hue-color-converter');
const colors = require('./data/colors');
let lastColorSet = "green";

module.exports =
    (twitchClient, target, context, color, silent = false) => {       
        changeLightBri(254);
        if (!color) {
            if (!silent) twitchClient.say(target, `Sorry @${context['display-name']}, you have to specify a color.`)
        } else if (color in colors) {
            lastColorSet = color;
            changeLightColor(color).then(c => {
                if (!silent) twitchClient.say(target, `@${context['display-name']} just changed the light to '${color}'.`)
            })
        } else if(color in special){
            special[color]();
        }
            else {
            if (!silent) twitchClient.say(target, `Sorry @${context['display-name']}, I don't know the color '${color}'.`)
        }
    }

const special={
    'copmode':copMode,
    'hype':hype,
    'fire':fire
}

function copMode() {
    var x = delay(1);
    for (let i = 0; i < 10; i++){        
        x=x.then(()=>changeLightColor("red",0))
        .then(()=>delay(200))      
        .then(()=>changeLightColor("blue",0))     
        .then(()=>delay(200));
    }
    x.then(()=>changeLightBri(254))
    .then(()=>changeLightColor(lastColorSet));
}

function hype() {
    var x = delay(1);
    for (let i = 0; i < 20; i++){        
        x=x.then(()=>delay(150))
        .then(()=>changeLightColor("purple",0))
        .then(()=>delay(150))
        .then(()=>changeLightOff())
    }
    x.then(()=>changeLightOn())
    .then(()=>changeLightColor(lastColorSet));
}

function fire() {
    var x = delay(1);
    for (let i = 0; i < 30; i++){        
        x=x.then(()=>delay(200))
        .then(()=>changeLightRGB(255,~~(Math.random()*64)+128,1))
    }
    x.then(()=>changeLightBri(254))
    .then(()=>changeLightColor(lastColorSet));
}
function delay(time) {
    return new Promise(res => {
        setTimeout(res, time);
    })
}

function changeLightColor(color, transitiontime = 10) {
    let R = parseInt(colors[color].substr(1, 2), 16);
    let G = parseInt(colors[color].substr(3, 2), 16);
    let B = parseInt(colors[color].substr(5, 2), 16);

    return changeLightRGB(R, G, B, transitiontime);
}

function changeLightOff(transitiontime = 10) {
    const state = {
        on: false,
        transitiontime: transitiontime
    };
    return callLight(state);
}
function changeLightOn(transitiontime = 10) {
    const state = {
        on: true,
        transitiontime: transitiontime
    };
    return callLight(state);
}
function changeLightBri(bri, transitiontime = 10) {
    const state = {
        bri: bri,
        transitiontime: transitiontime
    };
    return callLight(state);
}


function callLight(state) {
    return new Promise((res, rej) => request.put(`${process.env.HUE_URL}/lights/17/state`, {
        json: state
    }, function (error, response, body) {
        if (!!error) {
            rej(error);
        }
        res(body);
    }));
}

function changeLightRGB(R, G, B, transitiontime) {
    let xy = converter.calculateXY(R, G, B);
    const state = {
        on: true,  
        bri:254,
        sat:1,      
        xy: xy,
        transitiontime: transitiontime
    };
    return callLight(state);
}
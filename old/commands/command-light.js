const colorConvert = require('color-convert');
const TuyAPI = require('tuyapi');
const request = require('request');
const converter = require('@q42philips/hue-color-converter');
const colors = require('./data/colors');
const sfx = require('./command-sfx');
const utils = require('../lib/utils');

let lastColorSet = "purple";
const maxBrightness = 254;
const voiceMeterVolumeLow = 40;

const tuyaDevice = new TuyAPI({
    id: process.env.TUYAID,
    key: process.env.TUYAKEY
});
let tuyaDeviceFound = false;

tuyaDevice.find().then(() => {

    tuyaDevice.connect();
    tuyaDeviceFound=true;
}).catch(e => {
    console.log('could not connect to ledstrip.')
    
});

let initialized = false;

tuyaDevice.on('data', data => {
    if (!initialized) {
        initialized = true;
        ledStripColor('#0000FF')
        console.log('ledstrip initialized', initialized);
        return;
    }
});

module.exports =
    (twitchClient, target, context, color, silent = false) => {
        color = color.toLowerCase();
        changeLightBri(254);
        if (!color) {
            if (!silent) twitchClient.say(target, `Sorry @${context['display-name']}, you have to specify a color.`)
        } else if (color in colors) {
            lastColorSet = color;
            changeLightColor(color).then(c => {
                if (!silent) twitchClient.say(target, `@${context['display-name']} just changed the light to '${color}'.`)
            })
        } else if (color in special) {
            special[color]();
        }
        else {
            if (!silent) twitchClient.say(target, `Sorry @${context['display-name']}, I don't know the color '${color}'.`)
        }
    }

const special = {
    'copmode': copMode,
    'hype': hype,
    'fire': fire,
    'yellowhype': yellowhype,
    'greenhype': greenhype,
    'redhype': () => hype('red'),
    'flashbang': flashbang,
    'rainbow': rainbow,
    'random': random
}

function ledStripColor(color) {
    if (!tuyaDeviceFound) return;
    if (!tuyaDevice.isConnected()) {
        return tuyaDevice.connect().then(s => { if (s) setLedStripColor(color) });
    } else {
        return setLedStripColor(color);
    }
}
function setLedStripColor(clr) {
    if (!tuyaDeviceFound) return;
    let color = colorConvert.hex.hsl(clr);
    stateHasChanged = true;
    colorstring = `${color[0].toString(16).padStart(4, 0)}${(~~(color[1] * 10)).toString(16).padStart(4, 0)}${(~~(color[2] * 10)).toString(16).padStart(4, 0)}`;
    console.log(colorstring);
    return tuyaDevice.set({
        dps: 24,
        set: colorstring
    }).catch(e => console.log(e))
}

function random() {
    const allColors = Object.keys(colors);
    const selectedColor = allColors[~~(Math.random() * allColors.length)];
    changeLightColor(selectedColor);
    return selectedColor;
}

function copMode() {
    var x = changeLightBri(20, 1, 16);
    for (let i = 0; i < 10; i++) {
        x = x.then(() => changeLightColor("red", 0))
            .then(() => delay(200))
            .then(() => changeLightColor("blue", 0))
            .then(() => delay(200));
    }
    x.then(() => changeLightBri(254))
        .then(() => changeLightBri(maxBrightness, 1, 16))
        .then(() => changeLightColor(lastColorSet));
}

function hype(color = 'purple') {
    var x = changeLightBri(20, 1, 16);
    for (let i = 0; i < 13; i++) {
        x = x.then(() => delay(500))
            .then(() => changeLightColor(color, 0))
            .then(() => delay(500))
            .then(() => changeLightOff())
    }
    x.then(() => changeLightOn())
        .then(() => changeLightBri(maxBrightness, 1, 16))
        .then(() => changeLightColor(lastColorSet));
}

function yellowhype() {
    var x = changeLightBri(20, 1, 16);
    x = x.then(() => ledStripColor(colors["lightyellow"]));
    for (let i = 0; i < 13; i++) {
        x = x.then(() => delay(500))
            .then(() => changeLightColor("yellow", 0))
            .then(() => delay(500))
            .then(() => changeLightOff())
    }
    x.then(() => changeLightOn())
        .then(() => changeLightBri(maxBrightness, 1, 16))
        .then(() => changeLightColor(lastColorSet))
        .then(() => ledStripColor('#0000FF'));
}

async function greenhype() {
    await ledStripColor(colors["lightgreen"])
    await changeLightBri(10, 1, 16);
    for (let i = 0; i < 13; i++) {
        await changeLightColor("green", 1)
        await delay(500);
        await changeLightOff(1)
        await delay(500);
    }
    await changeLightBri(maxBrightness, 5, 16);
    await changeLightColor(lastColorSet, 5);
    await ledStripColor('#0000FF');
}

function fire() {
    var x = changeLightBri(20, 1, 16);
    for (let i = 0; i < 30; i++) {
        x = x.then(() => delay(200))
            .then(() => changeLightRGB(255, ~~(Math.random() * 64) + 128, 1))
    }
    x.then(() => changeLightBri(254))
        .then(() => changeLightBri(maxBrightness, 1, 16))
        .then(() => changeLightColor(lastColorSet));
}


function flashbang() {
    utils.lerp(voiceMeterVolumeLow, 0, 5, 200, v => sfx.triggerMidi(0xB1, 7, ~~v));
    setTimeout(() => {
        utils.lerp(0, voiceMeterVolumeLow, 15, 3500, v => sfx.triggerMidi(0xB1, 7, ~~v));
    }, 2700)

    var x = changeLightOff(0, 16)
        .then(() => changeLightOff(0, 17))
        .then(() => sfx.sfx7Days())
        .then(() => delay(1500))
        .then(() => changeLightOn(0, 16))
        .then(() => changeLightColor('white', 0, 17))
        .then(() => delay(200))
        .then(() => changeLightOff(0, 16))
        .then(() => changeLightOff(0, 17))
        .then(() => delay(1000))
        .then(() => changeLightOn(0, 16))
        .then(() => changeLightBri(maxBrightness, 15, 16))
        .then(() => changeLightColor(lastColorSet));
}

async function rainbow() {
    await changeLightBri(10, 1, 16);

    const delaytime = 500;
    const transitiontime = 5;
    const colors = ["red", "orange", "yellow", "green", "blue", "purple"]

    for (let i = 0; i < 5; i++) {
        for (let c = 0; c < colors.length; c++) {
            await changeLightColor(colors[c], transitiontime)
            await delay(delaytime);
        }
    }

    await changeLightBri(maxBrightness, 5, 16);
    await changeLightColor(lastColorSet, 5);
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

function changeLightOff(transitiontime = 10, lightId = 17) {
    const state = {
        on: false,
        transitiontime: transitiontime
    };
    return callLight(state, lightId);
}

function changeLightOn(transitiontime = 10, lightId = 17) {
    const state = {
        on: true,
        transitiontime: transitiontime
    };
    return callLight(state, lightId);
}

function changeLightBri(bri, transitiontime = 10, lightId = 17) {
    const state = {
        bri: bri,
        transitiontime: transitiontime
    };
    return callLight(state, lightId);
}

function callLight(state, lightId = 17) {
    return new Promise((res, rej) => request.put(`${process.env.HUE_URL}/lights/${lightId}/state`, {
        json: state
    }, function (error, response, body) {
        if (!!error) {
            console.error(error.message);
            rej(error);
        }
        res(body);
    }));
}

function changeLightRGB(R, G, B, transitiontime) {
    let xy = converter.calculateXY(R, G, B);
    const state = {
        on: true,
        bri: 254,
        sat: 1,
        xy: xy,
        transitiontime: transitiontime
    };
    return callLight(state);
}
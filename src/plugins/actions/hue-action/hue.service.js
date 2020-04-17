import converter from '@q42philips/hue-color-converter';
import { colors } from './colors';

const DEFAULT_COLOR = "purple";
const MAX_BRIGHTNESS = 254;
/**
 * Options for the install of Vue plugins
 * @typedef {object} HueServiceConfig Plugin options
 * @property {number} light Id of the hue light
 * @property {string} url Url of the hue base station
 */

/**
 * A service to control Hue lights
 */
export class HueService {

    /**
     * Instatiates a new Hue Service
     * @param {HueServiceConfig} config 
     */
    constructor(config) {
        this.light = config.light;
        this.url = config.url;
    }

    async setColor(color) {
        if(color['light-color']){
            color = color['light-color'];
        }
        if (color in colors) {
            await this.changeLightColor(color);
        } else switch (color.toLowerCase()) {
            case 'copmode':
                await this.copMode();
                break;
            case 'hype':
                    await this.hype('purple');
                    break;
            case 'greenhype':
                    await this.hype('green');
                    break;
            case 'yellowhype':
                    await this.hype('yellow');
                    break;
            case 'redhype':
                    await this.hype('red');
                    break;
            case 'bluehype':
                    await this.hype('blue');
                    break;
            case 'reset':
                await Promise.all(
                    [this.changeLightBri(MAX_BRIGHTNESS),
                    this.changeLightBri(MAX_BRIGHTNESS, 1, 16),
                    this.changeLightColor(DEFAULT_COLOR)]);
                break;
            case 'off':
                break;
            case 'off':
                break;
        }

    }
    /**
     * Changes the color of the light
     * @param {string} color name of the color that the light should become
     * @param {number} transitiontime the time the transition should take (defaults to 10)
     */
    changeLightColor(color, transitiontime = 10) {
        let R = parseInt(colors[color].substr(1, 2), 16);
        let G = parseInt(colors[color].substr(3, 2), 16);
        let B = parseInt(colors[color].substr(5, 2), 16);

        return this.changeLightRGB(R, G, B, transitiontime);
    }

    callLight(state, lightId = this.light) {
        return new Promise((res, rej) =>
            fetch(`${this.url}/lights/${lightId}/state`,
                {
                    method: 'PUT',
                    body: JSON.stringify(state)
                })
                .then(v => {
                    res(v.status);
                })
                .catch(error => {
                    console.log(error);
                    rej(error);
                }));
    }

    changeLightRGB(R, G, B, transitiontime) {
        let xy = converter.calculateXY(R, G, B);
        const state = {
            on: true,
            bri: 254,
            sat: 1,
            xy: xy,
            transitiontime: transitiontime
        };
        return this.callLight(state);
    }

    changeLightOff(transitiontime = 10, lightId = this.light) {
        const state = {
            on: false,
            transitiontime: transitiontime
        };
        return this.callLight(state, lightId);
    }

    changeLightOn(transitiontime = 10, lightId = this.light) {
        const state = {
            on: true,
            transitiontime: transitiontime
        };
        return this.callLight(state, lightId);
    }

    changeLightBri(bri, transitiontime = 10, lightId = this.light) {
        const state = {
            bri: bri,
            transitiontime: transitiontime
        };
        return this.callLight(state, lightId);
    }

    copMode() {
        let sequence = new Sequencer();
        sequence
            .addStep(() => this.changeLightBri(20, 1, 16), 0);
        for (let i = 0; i < 10; i++) {
            sequence
                .addStep(() => this.changeLightColor("red", 1), 250 + i * 500)
                .addStep(() => this.changeLightColor("blue", 1), 500 + i * 500)
        }
        return sequence.addStep(() => this.changeLightColor("purple", 1), 5500)
            .addStep(() => this.changeLightBri(MAX_BRIGHTNESS, 1, 16), 6000)
            .run();
    }

    hype(color) {
        let sequence = new Sequencer();
        sequence
            .addStep(() => this.changeLightColor(color, 1),0)
            .addStep(() => this.changeLightBri(20, 1, 16), 100);
        for (let i = 0; i < 20; i++) {
            sequence
                .addStep(() => this.changeLightBri(1, 3), 250 + i * 500)    
                .addStep(() => this.changeLightBri(MAX_BRIGHTNESS, 3), 500 + i * 500);    
        }
        return sequence.addStep(() => this.changeLightColor("purple", 1), 10500)
            .addStep(() => this.changeLightBri(MAX_BRIGHTNESS, 1), 10500)
            .addStep(() => this.changeLightBri(MAX_BRIGHTNESS, 1, 16), 10500)
            .run();
    }
}

class Sequencer {
    constructor() {
        this.steps = [];
    }

    /**
     * Adds a step to the sequencer
     * @param {function} callback The function to be called 
     * @param {number} time The milliseconds to wait before the function is called
     */
    addStep(callback, time) {
        this.steps.push({ callback, time });
        return this;
    }

    /**
     * Executes the sequence created
     */
    run() {
        return new Promise(res => {
            for (let i = 0; i < this.steps.length; i++) {
                setTimeout(() => {
                    //console.log(i);
                    this.steps[i].callback()
                }, this.steps[i].time);
            }
            setTimeout(() => res(), this.steps[this.steps.length - 1].time);
        })
    }
}

let delay = (time) => new Promise(res => setTimeout(res, time));






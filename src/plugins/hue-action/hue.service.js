import converter from '@q42philips/hue-color-converter';
import request from 'request';
import { colors } from './colors';
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
        console.log(colors.aqua);
    }

    async setColor(message) {
        if (message in colors) {
            await this.changeLightColor(message);
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

    callLight(state) {
        return new Promise((res, rej) => 
            request.put(`${this.url}/lights/${this.light}/state`, {
            json: state
        }, function (error, response, body) {
            if (!!error) {
                console.error(error.message);
                rej(error);
            }
            res(body);
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
}





import { Action } from '../../../lib';
import { vocoder } from './vocoder';
import fs from 'fs'
import path from 'path'

/**
 * Action for the TTS of Rosie.
 */
class TtsAction extends Action {

    /**
     * Instantiates a new Tts Action
     */
    constructor() {
        super('Text-to-Speech', 'com.sorskoot.action.tts');
        this.ctx = new AudioContext();
        this.vocoderInstance = vocoder();
        this.voice = 'Kendra';

        this.initialize();
    }

    /**
     * Initializes the vocoder
     */
    async initialize() {


        let carrier = await this.loadBuffer(this.ctx, path.join(__static, 'saw.wav'));
        this.vocoderInstance.init(this.ctx, carrier);
    }

    /**
     * Executes the action.
     * @param {string} message 
     */
    execute(message, params) {
        if (params && !!params.length) {
            let entries = Object.entries(params[0]);
            for (let i = 0; i < entries.length; i++) {
                const [key, value] = entries[i];
                message = message.replace(`{{${key}}}`, value);
            }
        }
        this.loadBuffer(this.ctx,
            `https://api.streamelements.com/kappa/v2/speech?voice=${this.voice}&text=${message}`)
            .then(d => this.vocoderInstance.vocode(d));
    }

    /**
     * Loads an audio buffer from a URL or Path.
     * @param {AudioContext} context Context to use to load the audio
     * @param {string} path Path/URL to the audio
     */
    async loadBuffer(context, filepath) {
                // /* use `fs` to consume the path and read our asset */
        // const reader = fs.readFileSync(pathToAsset, 'utf8')
        // let buffer = new ArrayBuffer(reader.length);
        // for (var i=0, strLen=reader.length; i < strLen; i++) {
        //     buffer[i] = reader.charCodeAt(i);
        //   }
         let response = await fetch(filepath);
         let buffer = await response.arrayBuffer();
        return new Promise((res, rej) => {
            context.decodeAudioData(buffer, function (theBuffer) {
                res(theBuffer);
            }, function (err) {
                rej(err);
            });
        })

    }
}
export default new TtsAction();
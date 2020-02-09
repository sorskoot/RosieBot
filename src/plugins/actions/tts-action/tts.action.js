import { Action } from '../../../lib';
import { vocoder } from './vocoder';

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
        let carrier = await this.loadBuffer(this.ctx, '/saw.wav');
        this.vocoderInstance.init(this.ctx, carrier);
    }

    /**
     * Executes the action.
     * @param {string} message 
     */
    execute(message) {
        this.loadBuffer(this.ctx,
            `https://api.streamelements.com/kappa/v2/speech?voice=${this.voice}&text=${message}`)
            .then(d => this.vocoderInstance.vocode(d));
    }

    /**
     * Loads an audio buffer from a URL or Path.
     * @param {AudioContext} context Context to use to load the audio
     * @param {string} path Path/URL to the audio
     */
    async loadBuffer(context, path) {
        let response = await fetch(path);
        let buffer = await response.arrayBuffer();
        return new Promise((res,rej)=>{
            context.decodeAudioData(buffer, function (theBuffer) {
                res(theBuffer);
            }, function (err) {
                rej(err);
            });
        })
        
    }
}

export default new TtsAction();
import { Action } from '../../../lib';
import { vocoder } from './vocoder';
import fs from 'fs'
import path from 'path'
import {phonetics} from './phonetics'

import {
    SpeechSynthesizer,
    SpeechConfig,
    AudioConfig,
    SpeechSynthesisOutputFormat
} from 'microsoft-cognitiveservices-speech-sdk'

const VoiceStyle = {
    /** Expresses a formal and professional tone for narrating news */
    Newscast: "newscast",
    /** Expresses a friendly and helpful tone for customer support */
    CustomerService: "customerservice",
    /** Expresses a casual and relaxed tone */
    Chat: "chat",
    /** Expresses a positive and happy tone */
    Cheerful: "cheerful",
    /** Expresses a sense of caring and understanding */
    Empathetic: "empathetic"
}

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
        const speechConfig =
            SpeechConfig.fromSubscription("bca140eaee554a9ca6ca4cf3921314f9", "eastus");

        // Set the output format
        speechConfig.speechSynthesisOutputFormat =
            SpeechSynthesisOutputFormat.Riff24Khz16BitMonoPcm;

        this.synthesizer = new SpeechSynthesizer(speechConfig, null);

    }

    /**
     * Executes the action.
     * @param {string} message 
     */
    execute(message, params) {
        let style = VoiceStyle.Chat;        
        if (params && !!params.length && !!params[0]) {
            let entries = Object.entries(params[0]);
            for (let i = 0; i < entries.length; i++) {
                const [key, value] = entries[i];
                if(key === 'sentiment'){
                    switch(value.toLowerCase()){
                        case 'positive':
                        case 'neutral':
                            style = VoiceStyle.Chat; 
                            break;
                        case 'negative':
                            style = VoiceStyle.Cheerful;
                            message = "A 'please' would've been nice!"
                            break;
                    }
                    
                }else{
                    message = message.replace(`{{${key}}}`, value);
                }
            }
        }      
        this.synthesizeSpeech(decodeURI(message));
    }

    /**
     * 
     * @param {string} message The message to be spoken
     */
    synthesizeSpeech(message, style = VoiceStyle.Chat) {
        const p = phonetics;
        if(p.some(ph=>message.toLowerCase().includes(ph.value))){
            p.forEach(ph=>{
                message = message.replace(new RegExp("(" + ph.value + ")", 'gi'), 
                    `<phoneme alphabet="sapi" ph="${ph.ph}">${ph.value}</phoneme>`)
            })
        }
        message = message.replace(/_/g, ' ');
        const ssml = [
            `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis"`,
            `    xmlns:mstts="https://www.w3.org/2001/mstts" xml:lang="en-US">`,
            `  <voice name="en-US-AriaNeural">`,            
            `    <prosody pitch="-10%" rate="0.8">`,
            `      <mstts:express-as style="${style}">`,
            `        ${message}`,
            `      </mstts:express-as>`,
            `    </prosody>`,
            `  </voice>`,
            `</speak>`].join('');

        this.synthesizer.speakSsmlAsync(
            ssml,
            result => {
                const audioData = result.audioData;
                this.byteArray(this.ctx, audioData).then(b => {
                    this.vocoderInstance.vocode(b);
                })
              //  this.synthesizer.close();
            },
            error => {
                console.log(error);
              //  this.synthesizer.close();
            });
    }

    byteArray(context, arrayBuffer) {
        return new Promise((res, rej) => {
            //  var arrayBuffer = new ArrayBuffer(byteArray.length);
            // var bufferView = new Uint8Array(arrayBuffer);
            // for (let i = 0; i < byteArray.length; i++) {
            //     bufferView[i] = byteArray[i];
            // }

            context.decodeAudioData(arrayBuffer, function (buffer) {
                res(buffer);
            });
        })
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
import {
    SpeechConfig,
    AudioConfig,
    SpeechRecognizer,
    ResultReason,
    ProfanityOption
} from "microsoft-cognitiveservices-speech-sdk";
import EventEmitter from 'events';
import { BotService } from "./bot.service";
/**
* The config
* @typedef {object} {SpeechRecConfig} s r c
* @property {sting} subscriptionkey  your subscrioptionKey
*/

/**
 * A service to use speech recognition using Azure Congnitive Services
 */
export class SpeechRecService extends EventEmitter {

    /**
     * The configuration for the speech recognition config
     * @param {SpeechRecConfig} config 
     */
    constructor(config) {
        super();
        this.config = config;

    }

    setupRecognizer() {
        this.bot = new BotService(this.config);

        this.bot.on("message-received", m => {
            this.emit("execute",
                {
                    intent: 'Say',
                    message: m
                });
        })

        this.bot.on("event-received", m => {
            console.log(`event:${m.event}, ${m.value}`)
            this.emit("execute",
                {
                    intent: m.event,
                    value: m.value
                });
        })

        this.speechConfig =
            SpeechConfig.fromSubscription(
                this.config.subscriptionkey,
                this.config.serviceRegion);
        this.speechConfig.setProfanity(ProfanityOption.Raw);
        
        this.recognizer =
            new SpeechRecognizer(this.speechConfig);


        this.recognizer.recognized = async (s, e) => {
            if (e.result.reason === ResultReason.RecognizedSpeech) {
                console.log(`recognized: ${e.result.text}`);
                this.bot.send(e.result.text);
            }
        }

        this.recognizer.canceled = function (s, e) {
            console.log('canceled', e);
        }

    }
    startRecognizing(callback) {
        this.bot.sendActivity("Initialization", "here we go");
        console.log('listening')

        this.recognizer.startContinuousRecognitionAsync(cb => {
        }, e => {
            console.error(e);
        })
    }

}

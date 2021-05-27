import {
    SpeechConfig,
    AudioConfig,
    SpeechRecognizer,
    ResultReason,
    ProfanityOption,
    KeywordRecognitionModel
} from "microsoft-cognitiveservices-speech-sdk";
import EventEmitter from 'events';
import { OpenAIService } from "./openai.service";
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
        this.speechConfig =
            SpeechConfig.fromSubscription(
                this.config.subscriptionkey,
                this.config.serviceRegion);
        this.speechConfig.setProfanity(ProfanityOption.Raw);

        var audioConfig = AudioConfig.fromDefaultMicrophoneInput();
        this.recognizer =
            new SpeechRecognizer(this.speechConfig, audioConfig);

        this.recognizer.recognized = async (s, e) => {
            //console.log(`-{ recognized }- ${e.result.text}`);
            if (e.result.reason === ResultReason.RecognizedSpeech) {
                if (this.conversation &&                    
                    /never\s?mind\W/gi.test(e.result.text) ||
                    /thank\s?you\W/gi.test(e.result.text) ||
                    /that['i\ss]+all\W/gi.test(e.result.text)) {
                    this.openAI = new OpenAIService(this.config);
                    this.listening = false;
                    this.conversation = false;
                    this.emit("execute",
                    {
                        intent: 'say',
                        text: "OK",
                        sentiment: 'positive'
                    });
                    return;
                }
                let topIntent = "None";
                let label = "neutral";
                let result = null;
                if (/hey\s?rosie\W/gi.test(e.result.text) ||
                    /hi\s?rosie\W/gi.test(e.result.text)){
                        this.emit("recognized", e.result.text);
                        topIntent = "Wake up";
                        label = "positive";
                    }
                else if (!this.conversation) {
                    // console.log('-{ no conversation }-');
                    result = await fetch(`${this.config.luisendpoint}/luis/prediction/v3.0/apps/${this.config.luisappid}/slots/PRODUCTION/predict?query=${encodeURI(e.result.text)}`,
                        {
                            headers: { "Ocp-Apim-Subscription-Key": this.config.luissubscriptionkey }
                        }).then(r => r.json());
                    this.emit("recognized", e.result.text);

                    if(!result.prediction || !result.prediction.intents){
                        console.log(`something is wrong:`);
                        console.dir(result);
                    }
                    else {
                        if (Object.values(result.prediction.intents)[0].score < 0.65) {
                            result.prediction.topIntent = "None"; //Ignore
                        
                        }    
                        topIntent = result.prediction.topIntent;             
                        label = result.prediction.sentiment.label;
                    }                       
                }
                switch (topIntent) {
                    case "Wake up":
                        //console.log('-{ wake up }-');
                        this.emit("execute",
                            {
                                intent: 'Wakeup',
                                sentiment: label
                            });
                        this.listening = true;
                        break;
                    case "None":
                        //console.log('-{ None }-');
                        if (this.listening) {
                            //console.log('-{ listening }-');
                            if (!this.openAI) {
                                this.openAI = new OpenAIService(this.config);
                            }
                            let response = await this.openAI.request(e.result.text);
                            this.conversation = true;
                            this.emit("conversation_started");
                            this.emit("execute",
                                {
                                    intent: 'say',
                                    text: response,
                                    sentiment: 'positive'
                                });
                            // this.emit("unknown");
                            // this.listening = false;
                            // // console.log("I don't understand");
                            // console.log(result);
                        }
                        break;
                    default:
                        if (this.listening) {
                            this.listening = false;
                            //console.log(result.prediction);
                            // analyse, could be not good enough
                            // then trigger action based on intent, 
                            // with parameters entities and values of those                            
                            // if (Object.keys(result.prediction.entities).length === 0) {
                            //     console.log(result);
                            //     this.emit("unknown");
                            // } else {
                            this.emit("execute",
                                {
                                    intent: result.prediction.topIntent,
                                    entities: result.prediction.entities,
                                    sentiment: result.prediction.sentiment.label
                                });
                            //}
                        }
                        break;
                }

            }
        }

        this.recognizer.canceled = function (s, e) {
            console.log('canceled', e);
        }

    }
    startRecognizing(callback) {

        console.log('listening')

        this.recognizer.startContinuousRecognitionAsync(cb => {
            // console.log(cb);            
        }, e => {
            console.error(e);
        })
    }

}

/*

  this.bot.on("message-received",m=>{
            //this.emit("recognized",m);

            this.emit("execute",
            {
              intent: 'Say',
              message:m
            });
        })

        this.bot.on("event-received",m=>{
            this.emit("execute",
            {
              intent: m.event,
              value: m.value
            });
        })

        */
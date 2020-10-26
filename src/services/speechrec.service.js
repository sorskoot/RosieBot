import {
    SpeechConfig,
    AudioConfig,
    SpeechRecognizer,
    ResultReason
} from "microsoft-cognitiveservices-speech-sdk";
import EventEmitter from 'events';
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
        this.recognizer =
            new SpeechRecognizer(this.speechConfig);
        
        
        this.recognizer.recognized = async (s, e) => {
            if (e.result.reason === ResultReason.RecognizedSpeech) {
                let result = await fetch(`${this.config.luisendpoint}/luis/prediction/v3.0/apps/${this.config.luisappid}/slots/PRODUCTION/predict?query=${encodeURI(e.result.text)}`,
                    {
                        headers: { "Ocp-Apim-Subscription-Key": this.config.luissubscriptionkey }
                    }).then(r => r.json());
                
                
                this.emit("recognized",e.result.text);
                //console.log(e.result.text,Object.values(result.prediction.intents)[0].score);
                if (Object.values(result.prediction.intents)[0].score < 0.65) {
                    result.prediction.topIntent = "None"; //Ignore
                }

                switch (result.prediction.topIntent) {
                    case "Wake up":
                        this.emit("execute",
                        {
                          intent: 'Wakeup'
                        });
                        this.listening = true;
                        break;
                    case "None":
                        if (this.listening) {
                            this.emit("unknown");
                            this.listening = false;
                            // console.log("I don't understand");
                            //console.log(result.query);
                        }
                        break;
                    default:
                        if (this.listening) {
                            this.listening = false;
                            console.log(result.prediction);
                            // analyse, could be not good enough
                            // then trigger action based on intent, 
                            // with parameters entities and values of those                            
                            if (Object.keys(result.prediction.entities).length === 0) {
                                console.log(result);
                                this.emit("unknown");
                            } else {

                                this.emit("execute",
                                    {
                                        intent: result.prediction.topIntent,
                                        entities: result.prediction.entities
                                    });
                            }
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
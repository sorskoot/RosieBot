import {
    SpeechConfig,
    AudioConfig,
    SpeechRecognizer,
    IntentRecognizer,
    LanguageUnderstandingModel,
    ResultReason
} from "microsoft-cognitiveservices-speech-sdk";

/**
* The config
* @typedef {object} {SpeechRecConfig} s r c
* @property {sting} subscriptionkey  your subscrioptionKey
*/

/**
 * A service to use speech recognition using Azure Congnitive Services
 */
export class SpeechRecService {

    /**
     * The configuration for the speech recognition config
     * @param {SpeechRecConfig} config 
     */
    constructor(config) {
        this.config = config;
    }

    getToken() {
        return new Promise((res, rej) => {
            fetch(
                this.config.tokenurl,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Ocp-Apim-Subscription-Key": this.config.subscriptionkey
                    }
                }
            ).then(
                x => {
                    x.text().then(d => {
                        this.token = d;
                        this.speechConfig =
                            SpeechConfig.fromAuthorizationToken(
                                this.token,
                                this.config.serviceRegion);
                        this.speechConfig.speechRecognitionLanguage = "en-US";
                        navigator.mediaDevices.enumerateDevices().then(m=>{
                            console.log(m.map(d=>{return{name:d.label, id:d.deviceId}}));
                        });
                        this.audioConfig = AudioConfig.fromDefaultMicrophoneInput();
                        
                        this.recognizer =
                            new SpeechRecognizer(this.speechConfig, this.audioConfig);
                            //new IntentRecognizer(this.speechConfig, this.audioConfig);
                        // this.recognizer.recognizing = function (s, e) {
                        //     console.log('recognizing',e);
                        // }
                        this.recognizer.recognized = function (s, e) {
            
                            console.log('recognized:',e.result.text);
                        }
                        this.recognizer.canceled = function (s, e) {
                            console.log('canceled',e);
                        }
                        res(d)
                    });
                },
                x => {
                    rej(x);
                }
            );
        });
    }
    setupRecognizer(){
        this.speechConfig =
        SpeechConfig.fromSubscription(
            this.config.subscriptionkey,
            this.config.serviceRegion);
            this.recognizer =                
            //new SpeechRecognizer(this.speechConfig, this.audioConfig);
                new IntentRecognizer(this.speechConfig, this.audioConfig);
        const lum = LanguageUnderstandingModel.fromAppId(this.config.appid);
        
        console.log(lum);
        this.recognizer.addIntent(lum, "Wake up", "id1");
        //this.recognizer.addAllIntents(lum);

        this.recognizer.recognized = function (s, e) {
            var str = "(recognized)  Reason: " + ResultReason[e.result.reason];
            console.log(str);
            console.log('recognized:',e.result.text + " IntentId: " + e.result.intentId);
        }
        this.recognizer.canceled = function (s, e) {
            console.log('canceled',e);
        }

    }
    startRecognizing(callback) {
      
        console.log('listening')

        this.recognizer.startContinuousRecognitionAsync(cb => {
            console.log(cb, arguments);
            callback(cb);
        }, e => {
            console.log(e);
        })
    }

}

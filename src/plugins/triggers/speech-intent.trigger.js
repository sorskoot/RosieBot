import { ObjectDisposedError } from 'microsoft-cognitiveservices-speech-sdk/distrib/lib/src/common/Error';
import { Trigger } from '../../lib';

/**
 * 
 */
class SpeechIntentTrigger extends Trigger {

    /**
     * Instantiates a new Trigger plugin
     */
    constructor() {
        super('Speech Intent', 'core.rosie.trigger.speech-intent');
    }

    /**
     * Called by the base class to specify the getter of the store to watch
     * @param {*} state 
     */
    storeGetter(state) {
        return state.speechrec.prediction;
    }

    /**
     * Called when a twitch event is received and raises
     * @param {twitchEvent} value 
     */
    storeChange(prediction) {
        if (prediction.intent && prediction.intent !== '') {
            if (!prediction.text && (!prediction.entities || !Object.entries(prediction.entities).length)) {
                this.triggerEvent(prediction.intent);
            } else {
                let obj = {};
                if (prediction.text) {
                    this.triggerEvent(prediction.intent, prediction.text);
                } else {
                    if (Array.isArray(prediction.entities[Object.keys(prediction.entities)[0]][0])) {
                        obj[Object.keys(prediction.entities)[0]] = prediction.entities[Object.keys(prediction.entities)[0]][0][0];
                    } else {
                        obj[Object.keys(prediction.entities)[0]] = prediction.entities[Object.keys(prediction.entities)[0]][0];
                    }
                    obj.sentiment = prediction.sentiment;
                    this.triggerEvent(prediction.intent, obj);
                }

            }
        }
    }
}

/**
 * Export an instance of the  trigger
 */
export default new SpeechIntentTrigger();
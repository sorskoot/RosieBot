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
        if (!prediction.entities) {
            this.triggerEvent(prediction.intent);
        } else {
            console.log(prediction);
            this.triggerEvent(prediction.intent, prediction.entities[Object.keys(prediction.entities)[0]][0][0]);
        }
    }
}

/**
 * Export an instance of the  trigger
 */
export default new SpeechIntentTrigger();
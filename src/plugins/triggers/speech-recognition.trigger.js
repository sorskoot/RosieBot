import {Trigger} from '../../lib';

/**
 * 
 */
class SpeechRecognitionTrigger extends Trigger {

    /**
     * Instantiates a new Trigger plugin
     */
    constructor(){
        super('Speech Recognition', 'core.rosie.trigger.speech-recognition');
    }

    onInstall() {
        this.$store.watch(
            state => state.config.config['events'],
            events => this.initEvents(events));
        super.onInstall();
    }
     /**
     * 
     * @param {[]} events 
     */
    initEvents(events) {
        this.reggies = [];
        for (let i = 0; i < events.length; i++) {
            if (!!events[i].trigger[this.uuid]) {
                if (Array.isArray(events[i].trigger[this.uuid])) {
                    for (let j = 0; j < events[i].trigger[this.uuid].length; j++) {
                        const command = events[i].trigger[this.uuid][j];
                        this.reggies.push(command);
                    }
                } else {
                    this.reggies.push(events[i].trigger[this.uuid].toLowerCase());
                }
            }
        }
    }

      /**
     * Called by the base class to specify the getter of the store to watch
     * @param {*} state 
     */
    storeGetter(state) {
        return state.speechrec.recognized;
    }
    
    storeChange(recognition) {
        for (let i = 0; i < this.reggies.length; i++) {
            const regex = RegExp(this.reggies[i], 'gi');
            if (regex.test(recognition)) {
                console.log('trigger:',recognition, this.reggies[i])
                this.triggerEvent(this.reggies[i], recognition);                
            }
        }
    }
}

/**
 * Export an instance of the  trigger
 */
export default new SpeechRecognitionTrigger();
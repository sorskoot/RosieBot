import {Trigger} from '../../../lib';

/**
 * 
 */
class EmoteTrigger extends Trigger {

    /**
     * Instantiates a new EmoteTrigger plugin
     */
    constructor(){
        super('Emote Trigger', 'rosie.core.trigger.emote');
    }

     /**
     * Called by the base class to specify the getter of the store to watch
     * @param {*} state 
     */
    storeGetter(state) {
        return state.twitchChat.message.emotes;
    }

    initialize(options){
       
    }

      /**
     * Called when a chat message is received and raises a trigger event 
     * @param {string} value 
     */
    storeChange(value) {
        if(!!value){
            this.triggerEvent('*',value);
        }
    }
}

/**
 * Export an instance of the Emote trigger
 */
export default new EmoteTrigger();
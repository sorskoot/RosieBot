import { Action } from '../../lib';

/**
 * TODO: Describe action 
 */
class TwitchEventAction extends Action {

    /**
     * Instantiates a new TwitchEvent Action
     */
    constructor() {
        super('Twitch Event', 'core.rosie.action.twich-event');
    }
    
    /**
     * Executes the action.
     * @param {string} message 
     */
    execute(message) {
        console.log(message);
        this.$store.dispatch("socket/emit",{event:"twitch-event",message});
    }

}

export default new TwitchEventAction();
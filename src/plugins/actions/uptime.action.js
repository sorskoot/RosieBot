import { Action } from '../../lib';

/**
 * TODO: Describe action 
 */
class UptimeAction extends Action {

    /**
     * Instantiates a new Uptime Action
     */
    constructor() {
        super('Uptime Action', 'com.sorskoot.action.uptime')
    }
    
    /**
     * Executes the action.
     * @param {string} message 
     */
    execute(message) {
        console.log(this.$store.state.twitch.event.uptime);
    }

}

export default new UptimeAction();
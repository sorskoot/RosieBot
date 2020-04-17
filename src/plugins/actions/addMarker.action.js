import { Action } from '../../lib';

/**
 * TODO: Describe action 
 */
class AddMarkerAction extends Action {

    /**
     * Instantiates a new AddMarker Action
     */
    constructor() {
        super('Add a Twitch Marker', 'rosie.core.action.add-marker')
    }
    
    /**
     * Executes the action.
     * @param {string} message 
     */
    execute(message, params) {
        if (params && !!params.length) {
            let entries = Object.entries(params[0]);
            for (let i = 0; i < entries.length; i++) {
                const [key, value] = entries[i];
                message = message.replace(`{{${key}}}`, value);
            }
        }
        console.log('marker:',message);
        this.$store.dispatch("twitch/addMarker", message);
    }

}

export default new AddMarkerAction();
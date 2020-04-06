import { Action } from '../../lib';
import {replaceAll} from '../../lib/utils';

/**
 * TODO: Describe action 
 */
class ObsAction extends Action {

    /**
     * Instantiates a new Obs
     * Action
     */
    constructor() {
        super('OBS Action', 'core.rosie.obs.action')
    }

    /**
     * Executes the action.
     * @param {string} message 
     */
    execute(intent, params) {
        console.log(intent, params);
        let message = intent;
        if (params && !!params.length) {
            let entries = Object.entries(params[0]);
            for (let i = 0; i < entries.length; i++) {
                const [key, value] = entries[i];
                message = replaceAll(message,`{{${key}}}`,value);
            }
        }
        if (intent === '{{obs-scene}}') {
            this.$store.dispatch('obs/changescene', message);
        } else {
            console.log('unknown intent');
        }
    }

}

export default new ObsAction();
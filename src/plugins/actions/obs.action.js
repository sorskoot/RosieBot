import { Action } from '../../lib';
import { replaceAll } from '../../lib/utils';

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
        if (typeof intent === "string") {
            let message = intent;
            if (params && !!params.length) {
                let entries = Object.entries(params[0]);
                for (let i = 0; i < entries.length; i++) {
                    const [key, value] = entries[i];
                    message = replaceAll(message, `{{${key}}}`, value);
                }
            }
            if (intent === '{{obs-scene}}') {
                this.$store.dispatch('obs/changescene', message);
            } else {
                console.log('unknown intent');
            }
        }
        else {
            if (intent.action) {
                switch (intent.action) {
                    case 'switch':
                        this.$store.dispatch('obs/changescene', intent.scene);                        
                        break;
                    case 'previous':
                        if(this.$store.state.obs.previousScene){
                            this.$store.dispatch('obs/changescene', this.$store.state.obs.previousScene);
                        }
                        break;
                    default:
                        console.log('unknown intent');
                        break;
                }
            }
        }
    }

}

export default new ObsAction();
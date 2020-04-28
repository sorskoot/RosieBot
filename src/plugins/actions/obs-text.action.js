import { Action } from '../../lib';
import { replaceAll } from '../../lib/utils';

/**
 * TODO: Describe action 
 */
class ObsTextAction extends Action {

    /**
     * Instantiates a new ObsGdiText Action
     */
    constructor() {
        super('OBS GDI Text', 'core.rose.action.obs-text')
    }

    execute(obj, params) {
        let message = obj.message;
        if (params && !!params.length) {
            let entries = Object.entries(params[0]);
            for (let i = 0; i < entries.length; i++) {
                const [key, value] = entries[i];
                message = replaceAll(message, `{{${key}}}`, value);
            }
        }
        this.$store.dispatch('obs/changetext', { target: obj.target, text:message });
    }

}

export default new ObsTextAction();
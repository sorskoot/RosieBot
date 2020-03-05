import { Action } from '../../../lib';
import { HueService } from './hue.service';

let hueService;
/**
 * Action to control a Hue light
 */
class HueAction extends Action {

    /**
     * Instantiates a new Chat Message Action
     */
    constructor() {
        super('Hue action', 'com.sorskoot.hue.action');
    }

    onInstall() {
        this.$store.watch(
            state => state.config.config['com.sorskoot.hue.action'],
            newValue => {
                if (!hueService) {
                    hueService = new HueService(newValue)
                };
            });
    }

    /**
     * Executes the action.
     * @param {string|object} color color to change to or object containing lightId and color
     */
    execute(color, params) {
        if (params && !!params.length) {
            let entries = Object.entries(params[0]);
            for (let i = 0; i < entries.length; i++) {
                const [key, value] = entries[i];
                color = color.replace(`{{${key}}}`, value);
            }
        }
        
        if (!!hueService) {
            if (color.lightId) {

            } else {
                hueService.setColor(color);
                    // .then(x => console.log(`done with color:${color}`))
                    // .catch(e => console.error(e));
            }
        }
    }

}

export default new HueAction();
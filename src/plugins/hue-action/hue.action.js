import { Action } from '../../lib';
import {HueService} from './hue.service';

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
    
    onInstall(){
        this.$store.watch(
            state => state.config.config['com.sorskoot.hue.action'],
            newValue => this.hueService = new HueService(newValue));
    }
    
    /**
     * Executes the action.
     * @param {string} color 
     */
    execute(color) {
        if(!!this.hueService){
            this.hueService.setColor(color).catch(e=>console.error(e));
        }
    }

}

export default new HueAction();
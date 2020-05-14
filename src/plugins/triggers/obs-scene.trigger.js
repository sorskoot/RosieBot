import {Trigger} from '../../lib';

/**
 * 
 */
class ObsSceneTrigger extends Trigger {

    /**
     * Instantiates a new ObsSceneTrigger plugin
     */
    constructor(){
        super('obs-scene trigger', 'core.rosie.trigger.obs-scene');
    }
    storeGetter(state) {
        return state.obs.currentScene;
    }
    
    storeChange(value) {
        this.triggerEvent(value);
    }
}

/**
 * Export an instance of the ObsScene trigger
 */
export default new ObsSceneTrigger();
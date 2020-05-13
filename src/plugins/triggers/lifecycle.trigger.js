import { Trigger } from '../../lib';

/**
 * 
 */
class LifecycleTrigger extends Trigger {

    /**
     * Instantiates a new AppStartTrigger plugin
     */
    constructor() {
        super('App Start', 'core.rosie.trigger.lifecycle');
    }

    /**
    * Called by the base class to specify the getter of the store to watch
    * @param {*} state 
    */
    storeGetter(state) {
        return state.rosie.rosiestate;
    }

     /**
     * Called when a twitch event is received and raises
     * @param {string} state
     */
    storeChange(value) {
        this.triggerEvent(value);
    }
}

/**
 * Export an instance of the AppStart trigger
 */
export default new LifecycleTrigger();
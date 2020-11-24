import { Trigger } from '../../lib';

/**
 * 
 */
class WebcamTrigger extends Trigger {

    /**
     * Instantiates a new Trigger plugin
     */
    constructor() {
        super('Web image classification', 'core.rosie.trigger.webcam');
    }
    /**
    * Called by the base class to specify the getter of the store to watch
    * @param {*} state 
    */
    storeGetter(state) {
        return state.webcam.prediction;
    }

    storeChange(intent){
        this.triggerEvent(intent);
    }
}

/**
 * Export an instance of the  trigger
 */
export default new WebcamTrigger();
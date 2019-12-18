import { Trigger } from '../../../lib';

class TimedTrigger extends Trigger {

    /**
     * Instantiates a new TimedTrigger plugin
     */
    constructor() {
        super("Timed trigger", 'rosie.core.trigger.timed');
    }

    initialize(time) {
        let timer = setInterval(() => {
            this.triggerEvent(time);
        }, time * 1000);
    }

}

export default new TimedTrigger();
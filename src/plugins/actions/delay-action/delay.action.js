import { Action } from '../../../lib';

/**
 * TODO: Describe action 
 */
class DelayAction extends Action {

    /**
     * Instantiates a new Delay Action
     */
    constructor() {
        super('Delay Action', 'rosie.core.action.delay')
    }

    /**
     * Executes the action.
     * @param {string} message 
     */
    execute({delay,action}, param) {
        let eventName = Object.getOwnPropertyNames(action)[0];
        let params = param;//[action[eventName],
                      //param];

        setTimeout(
            ()=>{
                this.$store.dispatch('triggerAction/trigger',{
                    uuid:'rosie.core.trigger.immidiate', 
                    eventName:action,
                    params:params});
            },
            delay
        )
        

    }

}

export default new DelayAction();
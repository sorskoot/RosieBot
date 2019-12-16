import { Action } from '../../lib';

/**
 * Triggers a random action from the list provided
 */
class RandomAction extends Action {

    /**
     * Instantiates a new Action
     */
    constructor() {
        super('RandomAction', 'rosie.core.action.random')
    }

    /**
     * Executes the action.
     * @param {any[]} actions A list of actions from the config
     */
    execute(actions) {
        this.$store.dispatch('triggerAction/trigger',{
            uuid:'rosie.core.trigger.immidiate', eventName:actions[~~(Math.random()*actions.length)]});
    }

}

export default new RandomAction();
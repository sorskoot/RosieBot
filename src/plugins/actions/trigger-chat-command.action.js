import { Action } from '../../lib';

/**
 * TODO: Describe action 
 */
class TriggerChatCommandAction extends Action {

    /**
     * Instantiates a new TriggerAction Action
     */
    constructor() {
        super('trigger-chat-command', 'core.rosie.action.trigger-chat-command')
    }
    
    /**
     * Executes the action.
     * @param {string} message 
     */
    execute(message) {
        this.$store.dispatch('triggerAction/trigger', {
            uuid: 'rosie.core.trigger.chat.command',
            eventName: message,
            params: []
        });
    }

}

export default new TriggerChatCommandAction();
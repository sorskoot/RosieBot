import { Action } from '../../../lib';

/**
 * Action to send a message to chat
 */
class ChatMessageAction extends Action {

    /**
     * Instantiates a new Chat Message Action
     */
    constructor() {
        super("Send Chat Message", 'rosie.core.action.chat.send')
    }
    
    /**
     * Executes the action. Dispatched the message to be send to Twitch Chat
     * @param {string} message The message to send to chat
     */
    execute(message) {
        this.$store.dispatch('twitchChat/sendMessage', message);
    }

}

export default new ChatMessageAction();
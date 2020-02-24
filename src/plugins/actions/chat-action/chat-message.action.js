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
    execute(message, params) {
        if (params && !!params.length) {
            let entries = Object.entries(params[0]);
            for (let i = 0; i < entries.length; i++) {
                const [key, value] = entries[i];
                message = replaceAll(message,`{{${key}}}`,value);
            }
        }
        this.$store.dispatch('twitchChat/sendMessage', message);
    }

}
function escapeRegExp(string) {
    return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }
function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
  }

export default new ChatMessageAction();
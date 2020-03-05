import { Action } from '../../lib';

/**
 * Action to send a message to console
 */
class ConsoleAction extends Action {

    /**
     * Instantiates a new Console Message Action
     */
    constructor() {
        super("Send Console Message", 'rosie.core.action.console')
    }

    /**
     * Executes the action. Dispatched the message to be send to the console
     * @param {string} message The message to send to the console
     */
    execute(message, params) {
        if (params && !!params.length) {
            let entries = Object.entries(params[0]);
            for (let i = 0; i < entries.length; i++) {
                const [key, value] = entries[i];
                message = message.replace(`{{${key}}}`, value);
            }
        }
        console.log(message);
    }

}

export default new ConsoleAction();
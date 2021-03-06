import Vue from 'vue';
import { Trigger } from '../../../lib';

/**
 * Trigger that fires a trigger event when a '!' command is received in chat
 */
class ChatCommandTrigger extends Trigger {

    /**
     * Instantiates a new ChatTrigger plugin
     */
    constructor() {
        super("Chat Command", 'rosie.core.trigger.chat.command');
    }

    /**
     * Called by the base class to specify the getter of the store to watch
     * @param {*} state 
     */
    storeGetter(state) {
        return state.twitchChat.message;
    }

    /**
       * Called when the action is installed in Vue
       */
    onInstall() {
        this.$store.watch(
            state => state.config.config['events'],
            events => this.initEvents(events));
        super.onInstall();
    }

    /**
     * 
     * @param {[]} events 
     */
    initEvents(events) {
        this.commands = [];
        for (let i = 0; i < events.length; i++) {
            if (!!events[i].trigger[this.uuid]) {
                if (Array.isArray(events[i].trigger[this.uuid])) {
                    for (let j = 0; j < events[i].trigger[this.uuid].length; j++) {
                        const command = events[i].trigger[this.uuid][j];
                        this.commands.push(command);
                    }
                } else {
                    this.commands.push(events[i].trigger[this.uuid].toLowerCase());
                }
            }
        }
    }

    /**
     * Called when a chat message is received and raises a trigger event 
     * @param {string} value 
     */
    storeChange(context) {
        if(!this.$store.state.global.active) return;
        if (!!~this.commands.indexOf(context.message.split(' ')[0].toLowerCase().trim())) {
            this.triggerEventContext(context, ...context.message.split(/\s/gi));
        }
    }
}

/**
 * Export an instance of the chat trigger plugin
 */
export default new ChatCommandTrigger();
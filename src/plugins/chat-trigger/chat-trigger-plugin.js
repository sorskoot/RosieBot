import Vue from 'vue';
import {Trigger} from '@/lib';
import chatCommandComponent from './chat-trigger';

/**
 * Trigger that fires a trigger event when a '!' command is received in chat
 */
class ChatTrigger extends Trigger {

    /**
     * Instantiates a new ChatTrigger plugin
     */
    constructor(){
        super("Chat Command", 'rosie.core.chat.trigger');
    }

    /**
     * Called by the base class to add a UI component
     * @param {Vue} vue the Vue instance of the application
     */
    addComponent(vue){
        vue.component('core-chat-trigger', chatCommandComponent)
    }

    /**
     * Called by the base class to specify the getter of the store to watch
     * @param {*} state 
     */
    storeGetter(state) {
        return state.twitchChat.message.message;
    }

    /**
     * Called when a chat message is received and raises a trigger event 
     * if the first word starts with a '!'.
     * @param {string} value 
     */
    storeChange(value) {
       if(value.trim().startsWith('!')){
            this.triggerEvent('chatCommand', ...value.split(/\s/gi).slice(1));
       }
    }
}

/**
 * Export an instance of the chat trigger plugin
 */
export default new ChatTrigger();
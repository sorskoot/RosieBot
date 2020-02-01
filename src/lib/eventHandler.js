import { Action } from './action';
import { Trigger } from './trigger';
import { Store, mapState } from 'vuex';

/**
 * Options for the install of Vue plugins
 * @typedef {object} VuePluginOptions Plugin options
 * @property {Store} store the Vuex store is passed in the options so it can be used in the plugin
 * @property {Trigger[]} triggers the available triggers
 * @property {Action[]} actions the available actions
   */

/**
 * Class that handles events that happen in the application. Takes care
 * of triggering actions.
 */
class EventHandler {


    /**
    * Install the EventHandler as a Vue Plugin
    * 
    * @param {Vue} Vue Vue instance
    * @param {VuePluginOptions} options Options object, contains the Vuex Store
    */
    install(Vue, options) {
        this.$store = options.store;
        this.actions = options.actions;
        this.triggers = options.triggers;

        this.$store.watch(
            state => state.config.config.events,
            newValue => this.initializeEvents(newValue));

        this.$store.watch(
            (state) => state.triggerAction.trigger,
            (newValue) => this.handleTrigger(newValue));
    }

    initializeEvents(events) {
        this.events = events;
        for (let i = 0; i < this.events.length; i++) {
            const event = this.events[i];
            let uuid = Object.getOwnPropertyNames(event.trigger)[0];
            let trigger =
                this.triggers.find(t => t.uuid === uuid);
            if (trigger) {
                trigger.initialize(event.trigger[uuid])
            }
        }
    }

    /**
    * 
    * @param {*} value 
     */
    handleTrigger(value) {
        if (value.uuid === 'rosie.core.trigger.immidiate') {
            this.executeAction(value.eventName, value);
        } else {
            const event = this.events.find(e =>
                e.trigger.hasOwnProperty(value.uuid) &&
                (!Array.isArray(e.trigger[value.uuid]) && e.trigger[value.uuid].toLowerCase() === value.eventName.toLowerCase()) ||
                (Array.isArray(e.trigger[value.uuid]) && !!~e.trigger[value.uuid].findIndex(i=>i.toLowerCase() === value.eventName.toLowerCase()))
                )
            if (event) {
                if (Array.isArray(event.action)) {
                    for (let index = 0; index < event.action.length; index++) {
                        const action = event.action[index];
                        this.executeAction(action, value);
                    }
                }
                else {
                    this.executeAction(event.action, value);
                }
            }
        }
    }

    executeAction(action, newValue) {
        let actionToCall;

        if (typeof action === "string") {
            actionToCall = this.actions.find(x => x.uuid === action);
            actionToCall.execute(...newValue.params);
        } else {
            actionToCall = this.actions.find(x => x.uuid === Object.getOwnPropertyNames(action)[0]);
            actionToCall.execute(action[actionToCall.uuid], newValue.params);
        }
    }
}

export default new EventHandler();
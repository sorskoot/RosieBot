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
            newValue => this.events = newValue);

        this.$store.watch(
            (state) => state.triggerAction.trigger,
            (newValue) => this.handleTrigger(newValue));
    }

    handleTrigger(value) {
        const event = this.events.find(e =>
            e.trigger.hasOwnProperty(value.uuid) &&
            e.trigger[value.uuid] === value.eventName);
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

    executeAction(action, newValue) {
        let actionToCall;

        if(typeof action === "string"){
            actionToCall = this.actions.find(x => x.uuid === action);
            actionToCall.execute(...newValue.params);
        }else{
            actionToCall = this.actions.find(x => x.uuid === Object.getOwnPropertyNames(action)[0]);
            actionToCall.execute(action[actionToCall.uuid], newValue.params);
        }
    }
}

export default new EventHandler();
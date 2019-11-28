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

    handleTrigger(newValue) {
        const event = this.events.find(e =>
            e.trigger.hasOwnProperty(newValue.uuid) &&
            e.trigger[newValue.uuid] === newValue.eventName);
        if (event) {
            const action = this.actions.find(
                x => x.uuid === Object.getOwnPropertyNames(event.action)[0]);
            action.execute(event.action[action.uuid], newValue.params);
        }
    }
}

export default new EventHandler();
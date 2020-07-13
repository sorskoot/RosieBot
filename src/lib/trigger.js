import { Plugin } from './plugin';

/**
 * Base class for Trigger Plugins. A trigger listens for something to happen.
 * Triggers are used to determain what Actions should be called.
 */
export class Trigger extends Plugin {

    /**
    * constructs a new trigger plugin. Should not be called directly
    * @param {string} name Name of the trigger plugin 
    * @param {string} uuid UUID of the trigger plugin
    */
    constructor(name, uuid) {
        super(name, uuid, 'Trigger');
    }

    onInstall() {
        this.$store.watch(
            (state, getters) => {
                return this.storeGetter(state)
            },
            (newValue, oldValue) => {
                this.storeChange(newValue, oldValue);
            });
    }

    triggerEventContext(context, eventName, ...params) {
        setTimeout(() => {
            this.$store.dispatch('triggerAction/trigger', { uuid: this.uuid, eventName, params, context });
        });
    }
    triggerEvent(eventName, ...params) {
        setTimeout(() => {
            this.$store.dispatch('triggerAction/trigger', { uuid: this.uuid, eventName, params });
        });
    }

    /**
     * The storeChange function is called when the value
     * selected in the storeGetter method changes.
     * 
     * Function needs to be overrided and
     * @param {*} newValue The new value of the state
     * @param {*} oldValue The old value of the state
     */
    storeChange(newValue, oldValue) { }

    /**
     * The storeGetter function should return an object from the state that 
     * the trigger should listen to.
     * 
     * Function needs to be overrided.
     * @param {*} state the Vuex Root State object
     */
    storeGetter(state) { }
}
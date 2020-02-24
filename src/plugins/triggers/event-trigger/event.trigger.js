import Vue from 'vue';
import { Trigger } from '../../../lib';
// import eventComponent from './event-trigger';

/**
 * Triggers when a Twitch event event happens.
 */
class EventTrigger extends Trigger {

    /**
     * Instantiates a new EventTrigger plugin
     */
    constructor() {
        super('Twitch Events trigger', 'rosie.core.trigger.twitchevent');
    }

    /**
    * Called by the base class to add a UI component
    * @param {Vue} vue the Vue instance of the application
    */
    addComponent(vue) {
        // console.log('core-event-trigger loaded');
        // console.log(eventComponent);
        // vue.component('core-event-trigger', eventComponent)
        // this.component = eventComponent;
    }

    initialize(options) {
        //   this.component.updateEvent('init');
    }

    /**
     * Called by the base class to specify the getter of the store to watch
     * @param {*} state 
     */
    storeGetter(state) {
        return state.twitch.event;
    }

    /**
     * Called when a twitch event is received and raises
     * @param {twitchEvent} value 
     */
    storeChange(value) {
        //this.component.updateEvent(value.type);
        this.triggerEvent(value.type, value);
    }
}

/**
 * Export an instance of the Event trigger
 */
export default new EventTrigger();
import { Trigger } from '../../lib';

/**
 * 
 */
class RegexTrigger extends Trigger {

    /**
     * Instantiates a new Trigger plugin
     */
    constructor() {
        super('Message Regex Trigger', 'core.rosie.trigger.regex');
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
        this.regex = [];
        for (let i = 0; i < events.length; i++) {
            if (!!events[i].trigger[this.uuid]) {
                if (Array.isArray(events[i].trigger[this.uuid])) {
                    for (let j = 0; j < events[i].trigger[this.uuid].length; j++) {
                        const regex = events[i].trigger[this.uuid][j];
                        this.regex.push(regex);
                    }
                } else {
                    this.regex.push(events[i].trigger[this.uuid].toLowerCase());
                }
            }
        }
    }

    /**
        * Called when a twitch event is received and raises
        * @param {twitchEvent} value 
        */
    storeChange({ message }) {
        for (let i = 0; i < this.regex.length; i++) {
            const regex = RegExp(this.regex[i]);
            if (regex.test(message)) {
                this.triggerEvent(this.regex[i], message);
            }
        }


    }
}

/**
 * Export an instance of the  trigger
 */
export default new RegexTrigger();
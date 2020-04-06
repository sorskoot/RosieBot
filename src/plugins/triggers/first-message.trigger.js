import {Trigger} from '../../lib';

/**
 * 
 */
class FirstMessageTrigger extends Trigger {

    /**
     * Instantiates a new FirstMessageTrigger plugin
     */
    constructor(){
        super('FirstMessage', 'rosie.core.trigger.first-message');
        this.users=[];
        this.seen=[];
    }
    
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
                        const user = events[i].trigger[this.uuid][j];
                        this.users.push(user);
                    }
                } else {
                    this.users.push(events[i].trigger[this.uuid].toLowerCase());
                }
            }
        }
    }
    
    storeChange({user}) {
        return;
        if(!!~this.users.indexOf(user)){
            if(!~this.seen.indexOf(user)){
                this.seen.push(user);
                this.triggerEvent(user,{user});
            }
        }
    }
}

/**
 * Export an instance of the  trigger
 */
export default new FirstMessageTrigger();
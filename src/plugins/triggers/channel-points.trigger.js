import {Trigger} from '../../lib';

/**
 * 
 */
class ChannelPointsTrigger extends Trigger {

    /**
     * Instantiates a new ChannelPointsTrigger plugin
     */
    constructor(){
        super('Channel Points Trigger', 'rosie.core.trigger.channel-points');
    }

    storeGetter(state) {
        return state.twitch.event;
    }

    storeChange(value) {
        if(!this.$store.state.global.channelPoints) return;
                
        if(value.type == 'channel-points'){
            this.triggerEvent(value.reward, value);
        }
    }
}

/**
 * Export an instance of the ChannelPoints trigger
 */
export default new ChannelPointsTrigger();
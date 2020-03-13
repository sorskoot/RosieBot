import { Action } from '../../lib';

/**
 * TODO: Describe action 
 */
class YouTubeRemoteAction extends Action {

    /**
     * Instantiates a new  Action
     */
    constructor() {
        super('YouTube Remote', 'com.sorskoot.action.youtube-remote')
    }

    /**
     * Executes the action.
     * @param {string} message 
     */
    async execute(_, params) {
        if (params && params[0]) {
            var myregexp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/gi;
            let r = new RegExp(myregexp);
            let result = r.exec(params[0].message);
            
            await this.$store.dispatch("socket/emit", {event: "player",args: "pause"});
            await this.$store.dispatch('triggerAction/trigger',{
                uuid:'rosie.core.trigger.immidiate', 
                    eventName:'com.sorskoot.midi.action',
                    params: [{"message": [177,7,80]}]
                })
            
            await this.$store.dispatch("socket/emit", {
                event: "youtube-player",
                args: { play: result[1] }
            });

        }

    }

}

export default new YouTubeRemoteAction();
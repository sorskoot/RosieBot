import { Action } from '../../lib';

/**
 * TODO: Describe action 
 */
class PlayerRemoteAction extends Action {

    /**
     * Instantiates a new PlayerRemote Action
     */
    constructor() {
        super('Player Remote Action', 'com.sorskoot.action.player-remote')
    }
    
    /**
     * Executes the action.
     * @param {string|object} arguments the arguments to send to the remote player
     */
    execute(args, params) {
        if(params && !params[0].type){
            let entries = Object.entries(params[0]);
            for (let i = 0; i < entries.length; i++) {
                const [key, value] = entries[i];
                args = args.replace(`{{${key}}}`, value);
            }
        }
        this.$store.dispatch("socket/emit", {
            event: "player",
            args: args
          });
    }

}

export default new PlayerRemoteAction();
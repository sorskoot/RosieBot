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
    execute(args) {
        console.log(args);
        this.$store.dispatch("socket/emit", {
            event: "player",
            args: args
          });
    }

}

export default new PlayerRemoteAction();
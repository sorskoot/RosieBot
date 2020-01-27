import { Action } from '../../../lib';

/**
 * TODO: Describe action 
 */
class EmoteAction extends Action {

    /**
     * Instantiates a new Emote Action
     */
    constructor() {
        super('Emote Action', 'core.rosie.action.emote')
    }
     
    /**
     * Executes the action.
     * @param {[]} emotes 
     */
    execute(emotes) {
        this.$store.dispatch("socket/emit",{event:"render emotes",args:emotes});
    }

}

export default new EmoteAction();
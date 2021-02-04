import { Action } from '../../lib';

/**
 * TODO: Describe action 
 */
class SpotifyAction extends Action {

    /**
     * Instantiates a new  Action
     */
    constructor() {
        super('Spotify Action', 'com.sorskoot.action.spotify')
    }
    
    /**
     * Executes the action.
     * @param {string} message 
     */
    execute(args) {
        let cmd = args;
        if(args['music-action']){
            cmd = args['music-action']
        }
        switch(cmd){
            case 'play':this.$store.dispatch("spotify/play");break;
            case 'pause':this.$store.dispatch("spotify/pause");break;
        }
        
    }

}

export default new SpotifyAction();
import { Action } from '../../lib';

/**
 * Plays an MP3
 */
class MP3Action extends Action {

    /**
     * Instantiates a new  Action
     */
    constructor() {
        super('Play MP3', 'core.rosie.action.mp3')
    }

    onInstall() {
        this.$store.watch(
            state => state.config.config['core.rosie.action.mp3'],
            newValue => {
                this.folder = newValue.folder;
            });
    }
    /**
     * Executes the action.
     * @param {string} file 
     */
    execute(file) {
        const a = new Audio(`file://${this.folder}/${file}`);
        a.play();
    }

}

export default new MP3Action();
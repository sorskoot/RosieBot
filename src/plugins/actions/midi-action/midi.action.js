import { Action } from '../../../lib';
import { MidiService } from './midi.service';

/**
 * Sends a Midi note when triggered
 */
class MidiAction extends Action {

    /**
     * Instantiates a new Midi Action
     */
    constructor() {
        super('Midi Action', 'com.sorskoot.midi.action');
    }

    /**
     * Called when the action is installed in Vue
     */
    onInstall() {
        this.$store.watch(
            state => state.config.config['com.sorskoot.midi.action'],
            options => this.midiService = new MidiService(options));
    }
    /**
     * Triggers a midi note.
     * @param {string} data The data from the config
     */
    execute(data) {
        if(!!data.message){
            this.midiService.triggerMidi(data.outputId, ...data.message);
        }else{
            this.midiService.triggerMidiNote(data.outputId, data.note);
        }
    }
}

export default new MidiAction();
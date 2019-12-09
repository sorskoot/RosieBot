/**
 * Options for the Midi Service
 * @typedef {object} MidiServiceOptions Plugin options
 * @property {string} outputId Id of the default midi output
 */

/**
 * A service to integrate with web Midi
 */
export class MidiService {

    /**
     * instantiates a new Midi Service
     * @param {MidiServiceOptions} options 
     */
    constructor(options) {
        this.defaultOutput = options.outputId;

        navigator.requestMIDIAccess({ sysex: true }).then(access => {
            // Get lists of available MIDI controllers
            this.midi = access;

            for (var entry of access.outputs) {
                var output = entry[1];
                console.log( "Output port [type:'" + output.type + "'] id:'" + output.id +
                  "' manufacturer:'" + output.manufacturer + "' name:'" + output.name +
                  "' version:'" + output.version + "'" );
              }

            access.onstatechange = function (e) {
                console.log(e.port.name, e.port.manufacturer, e.port.state);
            };
        })
    }
 
    /**
     * Trigger a midi note, sends a note message with 127 velocity
     * @param {string} outputId The output to use
     * @param {number} note The note to trigger
     */
    triggerMidiNote(outputId, note) {
        this.triggerMidi(outputId, 0x90, note, 127);
    }

    /**
     * 
     * @param {string} outputId The midi output id to use. When undefined the default output is used.
     * @param  {...any} message 
     */
    triggerMidi(outputId,...message) {
        let output = this.midi.outputs.get(outputId || this.defaultOutput);
        output.send( message )
    }
}



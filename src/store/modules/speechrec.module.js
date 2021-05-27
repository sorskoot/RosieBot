import { SpeechRecService } from '../../services/speechrec.service';

const SPEECHINTENT_START_RECOGNIZING = 'Starting recognizing';
const SPEECHINTENT_WAKEUP = '✅ Waking up, listening for intent';
const SPEECHINTENT_RECEIVED = '✅ Got Speech Intent';
const SPEECHINTENT_UNKNOWN = '❔ Unknown Speech Intent';
const SPEECHINTENT_FAILURE = '❌ Failed getting Speech Intent';
const SPEECH_RECOGNIZED = '✅ Speech recognized';
const SPEECH_CONVERSATION_STARTED = '✅ Conversation Started';

let speechRecService;

const actions = {
    start({ commit, rootState }) {
        if (!speechRecService) {
            speechRecService = new SpeechRecService(rootState.config.config['core.rosie.speechrecognition']);

            speechRecService.on("wakeup", () => {
                commit(SPEECHINTENT_WAKEUP);
            });
            speechRecService.on("unknown", () => {
                commit(SPEECHINTENT_UNKNOWN);
            });
            speechRecService.on("execute", (data) => {
                commit(SPEECHINTENT_RECEIVED, data);
            });
            speechRecService.on("recognized", text => {
                commit(SPEECH_RECOGNIZED, text);
            })
            speechRecService.on("conversation_started",() => {
                commit(SPEECH_CONVERSATION_STARTED, +new Date());
            });

            speechRecService.setupRecognizer();
            speechRecService.startRecognizing();
            commit(SPEECHINTENT_START_RECOGNIZING);
        }
    }
}
const mutations = {
    [SPEECHINTENT_START_RECOGNIZING](state) { state.listening = true; },
    [SPEECHINTENT_WAKEUP](state) {
        state.wakeup = true;
        state.prediction = { intent: "Wakeup" }
    },
    [SPEECHINTENT_RECEIVED](state, data) { state.prediction = data; state.wakeup = false; },
    [SPEECHINTENT_UNKNOWN](state) { state.prediction = { intent: "None" }; state.wakeup = false; },
    [SPEECHINTENT_FAILURE](state, error) { state.wakeup = false; },
    [SPEECH_RECOGNIZED](state, text) { state.recognized = text; },
    [SPEECH_CONVERSATION_STARTED](state, time) { state.converationStarted = time; }
}

/**
 * Export the Vuex store module
 */
export default {
    namespaced: true,
    state: {
        listening: false,
        wakeup: false,
        recognized: '',
        prediction: {
            intent: '',
            entities: {},
        },
        converationStarted:0
    },
    actions: actions,
    mutations: mutations
}
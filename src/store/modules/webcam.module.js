import { WebCamService } from '../../services/webcam.service';

const WEBCAM_INITIALIZING = 'Initializing webcam';
const WEBCAM_INITIALIZED = 'Webcam Initialized';
const WEBCAM_PREDICTION = '🎦 New Webcam Prediction';

let webCamService;

const actions = {
    initialize({ commit }) {
        if (!webCamService) {
            webCamService = new WebCamService();            
            webCamService.on('webcam-prediction-change', (prediction)=>{
                commit(WEBCAM_PREDICTION, prediction);
            });
            commit(WEBCAM_INITIALIZING);
            webCamService.init().then(v => {
                commit(WEBCAM_INITIALIZED);
            });
        }
    }
}

const mutations = {
    [WEBCAM_INITIALIZING](state) {
        state.initialized = false;
    },
    [WEBCAM_INITIALIZED](state) {
        state.initialized = true;
    },
    [WEBCAM_PREDICTION](state, prediction) {
        state.prediction = prediction;
    }
}

export default {
    namespaced: true,
    state: {
        initialized: false,
        prediction: ''
    },
    actions: actions,
    mutations: mutations
}
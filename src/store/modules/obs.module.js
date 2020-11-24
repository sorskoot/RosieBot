import obsService from '../../services/obs.service'
const CONNECTING = 'Connecting';
const CONNECTED = '✅ Connected ';
const CONNECTING_FAILED = '❌ Connection Failed';

const OBS_CHANGESCENE = 'Changing Scene';
const OBS_CHANGEDSCENE = '✅ Scene Changed';
const OBS_CHANGESCENE_SUCCESS = '✅ Changing Scene';
const OBS_CHANGESCENE_FAILED = '❌ Changing Scene failed';

const OBS_CHANGETEXT = 'Changing Text';
const OBS_CHANGETEXT_SUCCESS = '✅ Changing Text';
const OBS_CHANGETEXT_FAILED = '❌ Changing Text failed';


const actions = {
    connect({ commit, rootState }) {
        commit(CONNECTING);

        var max = 25;
        var p = Promise.reject();

        for (var i = 0; i < max; i++) {
            p = p.catch(() => obsService.connect(rootState.config.config['core.rosie.obs']))
                .catch(rejectDelay);
        }
        p = p.then(() => {
            commit(CONNECTED);
            obsService.on('obs-scene-change',scene=>{
                commit(OBS_CHANGEDSCENE, scene);
            });
        }).catch((e) => {
            commit(CONNECTING_FAILED, e.message);
        });

    },
    async changescene({ commit, state }, scene) {
        commit(OBS_CHANGESCENE, scene);
        if (state.connected) {
            await obsService.setScene(scene);
            commit(OBS_CHANGESCENE_SUCCESS);
        } else {
            commit(OBS_CHANGESCENE_FAILED);
        }
    },
    async changetext({ commit, state }, { target, text }) {
        commit(OBS_CHANGETEXT);
        if (state.connected) {
            await obsService.setText(target, text);
            commit(OBS_CHANGETEXT_SUCCESS);
        } else {
            commit(OBS_CHANGETEXT_FAILED);
        }
    }
}
const mutations = {
    [CONNECTING](state) { state.connected = false; },
    [CONNECTED](state) { state.connected = true; },
    [CONNECTING_FAILED](state, error) { state.connected = false; state.error = error; },
    
    [OBS_CHANGESCENE](state) { },
    [OBS_CHANGEDSCENE](state,scene) { 
        state.previousScene = state.currentScene;
        state.currentScene = scene;
    },
    [OBS_CHANGESCENE_SUCCESS](state) { },
    [OBS_CHANGESCENE_FAILED](state) { },

    [OBS_CHANGETEXT](state) { },
    [OBS_CHANGETEXT_SUCCESS](state) { },
    [OBS_CHANGETEXT_FAILED](state) { },
}

/**
 * Export the Vuex store module
 */
export default {
    namespaced: true,
    state: {
        connected: false,
        error: '',
        currentScene:'',
        previousScene:''
    },
    actions: actions,
    mutations: mutations
}
let delay = 5000;
function rejectDelay(reason) {
    return new Promise(function (resolve, reject) {
        setTimeout(reject.bind(null, reason), delay);
    });
}
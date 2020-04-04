import obsService from '../../services/obs.service'
const CONNECTING = 'Connecting';
const CONNECTED = '✅ Connected ';
const CONNECTING_FAILED = '❌ Connection Failed';

const actions = {
    async connect({ commit, rootState }) {
        commit(CONNECTING);
        try {
            await obsService.connect(rootState.config.config['core.rosie.obs'])
            commit(CONNECTED);
        } catch (e) {
            commit(CONNECTING_FAILED, e.message);
        }
    }
}
const mutations = {
    [CONNECTING](state) { state.connected = false; },
    [CONNECTED](state) { state.connected = true; },
    [CONNECTING_FAILED](state, error) { state.connected = false; state.error = error; }
}

/**
 * Export the Vuex store module
 */
export default {
    namespaced: true,
    state: {
        connected: false,
        error: ''
    },
    actions: actions,
    mutations: mutations
}
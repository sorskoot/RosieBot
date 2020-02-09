import ipcService from '../../services/ipc.service';

const API_REQUEST_RECEIVED = '✅ Got API REQUEST';
const API_RESPONSE = 'Sending API Response';
const API_RESPONSE_SUCCESS = '✅ Response send successfull';


const actions = {
    open({ commit }) {
        ipcService.on('api-request', (e, args) => {
            commit(API_REQUEST_RECEIVED, args);
        })
    },
    return({ commit }, { id, data }) {
        commit(API_RESPONSE);
        ipcService.sendAPI(id, data);
        commit(API_RESPONSE_SUCCESS);
    }
}
const mutations = {
    [API_REQUEST_RECEIVED](state, args) { state.id = args.id; state.data = args.data },
    [API_RESPONSE](state) { },
    [API_RESPONSE_SUCCESS]() { state.id = 0 }
}

/**
 * Export the Vuex store module
 */
export default {
    namespaced: true,
    state: {
        id: 0,
        data: {}
    },
    actions: actions,
    mutations: mutations
}
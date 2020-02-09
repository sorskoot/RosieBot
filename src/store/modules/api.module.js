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
    [API_REQUEST_RECEIVED](state, { id, data }) {
        state.request = {
            id: id,
            data: data.data,
            api: data.api
        }
    },
    [API_RESPONSE](state) { state.busy = true; },
    [API_RESPONSE_SUCCESS](state) {
     //   state.request = { id: 0, api: '', data: {} };
        state.busy = false;
    }
}

/**
 * Export the Vuex store module
 */
export default {
    namespaced: true,
    state: {
        busy: false,
        request: {
            id: 0,
            data: {},
            api: ''
        }
    },
    actions: actions,
    mutations: mutations
}
import SocketService from '../../services/socket.service';

const CONNECTION_SUCCESS = '✅ Socket connection opened ';
const EMIT = 'emitting socket broadcast';
const EMIT_SUCCESS = '✅ successfully emitted socket broadcast';


const actions = {
    open({ commit}) {
        commit(CONNECTION_SUCCESS);
    },
    emit({commit}, {event, args}){
        commit(EMIT);
        SocketService.emit(event, args);
        commit(EMIT_SUCCESS);
    }
}

const mutations = {
    [CONNECTION_SUCCESS](state) { state.connected = true },
    [EMIT](state){},
    [EMIT_SUCCESS](state){},
}

/**
 * Export the Vuex store module
 */
export default {
    namespaced: true,
    state: {},
    actions: actions,
    mutations: mutations
}



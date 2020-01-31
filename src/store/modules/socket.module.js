import SocketService from '../../services/socket.service';
import socketService from '../../services/socket.service';

const CONNECTION_SUCCESS = '✅ Socket connection opened ';
const EMIT = 'emitting socket broadcast';
const EMIT_SUCCESS = '✅ successfully emitted socket broadcast';
const TRIGGER_RECEIVED = '✅ Trigger received from websocket'

const actions = {
    open({ commit }) {
        socketService.on('trigger', args => {
            console.log('trogger',args);
            commit(TRIGGER_RECEIVED, args);
        });
        commit(CONNECTION_SUCCESS);
    },
    emit({ commit }, { event, args }) {
        commit(EMIT);
        SocketService.emit(event, args);
        commit(EMIT_SUCCESS);
    }
}

const mutations = {
    [CONNECTION_SUCCESS](state) { state.connected = true },
    [EMIT](state) { },
    [EMIT_SUCCESS](state) { },
    [TRIGGER_RECEIVED](state, event) {
        console.log(event);
        state.event = event[0];
        state.args = event.slice(1);
        state.timestame = +new Date();
    }
}

/**
 * Export the Vuex store module
 */
export default {
    namespaced: true,
    state: {
        event:'',
        args:{},
        timestame:0
    },
    actions: actions,
    mutations: mutations
}



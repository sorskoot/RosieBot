const ROSIE_STATE = 'Changing Rosie State';

const actions = {
    changeState({commit}, newState){
        commit(ROSIE_STATE, newState)
    }
}

const mutations = {
    [ROSIE_STATE](state, newState) {
        state.rosiestate = newState;
    }
}

export default {
    namespaced: true,
    state: {
        rosiestate: ''
    },
    actions: actions,
    mutations: mutations
}
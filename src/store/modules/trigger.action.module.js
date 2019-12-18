const TRIGGER = 'Trigger';

const actions = {
    trigger({ commit }, { uuid, eventName, params }) {
        commit(TRIGGER, { uuid, eventName, params});
    }
}

const mutations = {
    [TRIGGER](state, { uuid, eventName, params }) {
        state.trigger = { uuid, eventName, params, timestamp: +new Date()  };
    }
}

export default {
    namespaced: true,
    state: {
        trigger: {
            uuid: '',
            eventName: '',
            params: [],
            timestamp: {}
        }
    },
    actions: actions,
    mutations: mutations
}
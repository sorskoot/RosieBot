const TRIGGER = 'Trigger';

const actions = {
    trigger({ commit }, { uuid, eventName, params, context }) {
        commit(TRIGGER, { uuid, eventName, params, context});
    }
}

const mutations = {
    [TRIGGER](state, { uuid, eventName, params, context }) {
        state.trigger = { uuid, eventName, params, context, timestamp: +new Date()  };
    }
}

export default {
    namespaced: true,
    state: {
        trigger: {
            uuid: '',
            eventName: '',
            context: {},
            params: [],
            timestamp: {}
        }
    },
    actions: actions,
    mutations: mutations
}
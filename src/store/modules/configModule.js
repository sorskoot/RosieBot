import { configService } from '../../services/configService';

const GET_CONFIG = 'Getting config';
const GET_CONFIG_SUCCESS = '✅ Got config';
const GET_CONFIG_FAILURE = '❌ Failed getting config';

const getters = {}
const actions = {
    getConfig({ commit }) {
        commit(GET_CONFIG);
        configService.getConfig().then(
            config => commit(GET_CONFIG_SUCCESS, config),
            error => commit(GET_CONFIG_FAILURE, error))
    }
}
const mutations = {
    [GET_CONFIG](state) { },
    [GET_CONFIG_SUCCESS](state, config) { state.config = config },
    [GET_CONFIG_FAILURE](state, error) { console.error(error)}
}

export default {
    namespaced: true,
    state: {
        config: {},
    },
    getters: getters, 
    actions: actions,
    mutations: mutations
}

import { twitchService } from '../../services/twitchService';

export const GET_USER = 'Get User';
export const GET_USER_SUCCESS = '✅ Get User Success';
export const GET_USER_FAIL = '❌ Get User Fail';

const actions = {
    GetUser({ commit,state },username) {
        commit(GET_USER);
        twitchService.getUser(username)
            .then(
                user => commit(GET_USER_SUCCESS, user.data[0]),
                error => commit(GET_USER_FAIL, error)
            );
    }
}
const getters = {};

const mutations = {
    [GET_USER](state) {
        state.loading = true;
    },
    [GET_USER_SUCCESS](state, user) {
        state.user = user;
        state.loading = false;
    },
    [GET_USER_FAIL](state, error) {
        state.loading = false;
        state.error = error;
    }
}

export default {
    namespaced: true,
    state: {
        user: {},
        loading: false
    },
    getters:getters,
    actions: actions,
    mutations: mutations
}

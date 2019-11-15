import { twitchService } from '../../services/twitchService';

export const GET_USER = 'Get User';
export const GET_USER_SUCCESS = '✅ Get User Success';
export const GET_USER_FAIL = '❌ Get User Fail';

const actions = {
    GetUser({ commit }) {
        commit(GET_USER);
        twitchService.getUser()
            .then(
                users => commit(GET_USER_SUCCESS, users),
                error => commit(GET_USER_FAIL, error)
            );
    }
}

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
    state: {
        user: {},
        loading: false
    },
    actions: actions,
    mutations: mutations
}

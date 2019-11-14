import {twitchService} from '../../services/twitchService';

// import actions from './users.actions';
// import mutations from './users.mutations';

const actions = {
    getInfo({commit}) {
    //   commit(GET_USER);
    //   userService.getInfo()
    //     .then(
    //         users => commit(GET_USER_SUCCESS, users),
    //         error => commit(GET_USER_FAIL, error)
    //     );
     }
}

const mutations = {
    // [GET_USER](state) {
    //     state.loading = true;
    // },
    // [GET_USER_SUCCESS](state, user) {
    //     state.user = user;
    //     state.loading = false;
    // },
    // [GET_USER_FAIL](state, error) {
    //     state.loading = false;
    //     state.error = error;
    // }
}

export default {
    state: {
      user:{},
      loading:false
    },
    actions: actions,
    mutations: mutations
  }
  
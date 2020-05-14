const SET_GLOBALSETTING = 'Setting global setting';
const SET_GLOBALSETTING_SUCCESS = '✅ Set global setting';
const SET_GLOBALSETTING_FAILURE = '❌ Failed setting global setting ';

const actions = {
    set({ commit }, {key, value}) {        
        commit(SET_GLOBALSETTING_SUCCESS,{key,value});
    }
}
const mutations = {
   [SET_GLOBALSETTING](state) { },
   [SET_GLOBALSETTING_SUCCESS](state,data) { state[data.key] = data.value },
   [SET_GLOBALSETTING_FAILURE](state,error) { console.error(error) }
}

/**
 * Export the Vuex store module
 */
export default {
    namespaced: true,
    state: {
        active:true,
        channelPoints:false
    },
    actions: actions,
    mutations: mutations
}
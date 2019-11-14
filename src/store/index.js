import Vue from 'vue'
import Vuex from 'vuex'
import twitch from './modules/twitchModule';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    twitch
  }
})

import Vue from 'vue'
import Vuex from 'vuex'
// import twitch from './modules/twitchModule';
// import twitchChat from './modules/twitchMessageModule';
// import config from './modules/configModule';
// import triggerAction from './modules/triggerActionModule';
import modules from './modules';
Vue.use(Vuex)

export default new Vuex.Store({
    modules,
    strict: process.env.NODE_ENV !== 'production',
});
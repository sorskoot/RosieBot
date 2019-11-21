import Vue from 'vue'
import Vuex from 'vuex'
import twitch from './modules/twitchModule';
import twitchChat from './modules/twitchMessageModule';
import config from './modules/configModule';

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        twitch,
        twitchChat,
        config
    }
});
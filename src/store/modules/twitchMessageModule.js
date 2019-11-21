import { twitchMessageService } from '../../services/twitchMessageService';

export const TWITCH_IRC_CONNECTING = 'Connecting to Twitch IRC';
export const TWITCH_IRC_CONNECTED = '✅ Connected to Twitch IRC';
export const TWITCH_IRC_DISCONNECTED = '❌ Disconnected from Twitch IRC';
export const TWITCH_IRC_MESSAGE = '✅ Twitch IRC Message';

const actions = {
    //sync or async
    connect({ commit, dispatch, rootState }) {
        commit(TWITCH_IRC_CONNECTING);
        twitchMessageService.connect(rootState.config.config.twitchMessage)
            .then(
                data => {
                    twitchMessageService.setCallback((target, context, msg, self) => {
                        dispatch('message', { target, context, msg, self });
                    })
                    commit(TWITCH_IRC_CONNECTED, data);
                },
                error => commit(TWITCH_IRC_DISCONNECTED, error)
            );
    },

    message({ commit }, { target, context, msg, self }) {
        // remove check for 'bot_rosie' when the old version goes offline
        if (self || context['display-name'] === 'bot_rosie') { return };
        commit(TWITCH_IRC_MESSAGE,
            {
                user: context['display-name'],
                message: msg,
                emotes: context.emotes,
                badges: context.badges
            });
    }
}


const getters = {};

const mutations = {
    //sync
    [TWITCH_IRC_CONNECTING](state) {
        state.isConnected = false;
    },
    [TWITCH_IRC_CONNECTED](state) {
        state.isConnected = true;
    },

    [TWITCH_IRC_DISCONNECTED](state) {
        state.isConnected = false;
    },

    [TWITCH_IRC_MESSAGE](state, message) {
        state.message = message
    }
}

export default {
    namespaced: true,
    state: {
        isConnected: false,
        message: ''
    },
    getters: getters,
    actions: actions,
    mutations: mutations
}

import twitchMessageService from '../../services/twitch.message.service';

export const TWITCH_IRC_CONNECTING = 'Connecting to Twitch IRC';
export const TWITCH_IRC_CONNECTED = '✅ Connected to Twitch IRC';
export const TWITCH_IRC_DISCONNECTED = '❌ Disconnected from Twitch IRC';
export const TWITCH_IRC_MESSAGE = '✅ Twitch IRC Message';
export const TWITCH_IRC_SEND_MESSAGE = 'Sending IRC Message';
export const TWITCH_IRC_SEND_MESSAGE_SUCCESS = '✅ Succes Sending IRC Message';
export const TWITCH_IRC_SEND_MESSAGE_FAILURE = '❌ Failed Sending IRC Message';

const actions = {
    //sync or async
    connect({ commit, dispatch, rootState }) {
        commit(TWITCH_IRC_CONNECTING);
        twitchMessageService.connect(rootState.config.config.twitchMessage)
            .then(
                data => {
                    twitchMessageService.setCallback((context, msg, self) => {
                        dispatch('message', { context, msg, self });
                    })
                    commit(TWITCH_IRC_CONNECTED, data);
                },
                error => commit(TWITCH_IRC_DISCONNECTED, error)
            );
    },
    /**
     * Sends a message to Twitch chat.
     */
    async sendMessage({ commit }, message) {
        commit(TWITCH_IRC_SEND_MESSAGE);
        try {
            await twitchMessageService.send(message);
            commit(TWITCH_IRC_SEND_MESSAGE_SUCCESS);
        } catch (err) {
            commit(TWITCH_IRC_SEND_MESSAGE_FAILURE, err)
        }
    },
    /**
     * called when a message is received from Twitch
     * @param {*} param0 
     * @param {*} param1 
     */
    message({ commit }, { context, msg, self }) {
        // remove check for 'bot_rosie' when the old version goes offline
        if (msg[0] != '!') {
            if (self || context['display-name'] === 'bot_rosie') { return };
        }
        commit(TWITCH_IRC_MESSAGE,
            {
                user: context['display-name'],
                color: context.color ? context.color : "#FF00FF",
                message: msg,
                emotes: context.emotes,
                badges: context.badges,
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
        state.message.timestamp = +new Date();
    },
    [TWITCH_IRC_SEND_MESSAGE](state) { state.isSendingMessage = true; },
    [TWITCH_IRC_SEND_MESSAGE_SUCCESS](state) { state.isSendingMessage = false; },
    [TWITCH_IRC_SEND_MESSAGE_FAILURE](state) { state.isSendingMessage = false; }
}

export default {
    namespaced: true,
    state: {
        isConnected: false,
        isSendingMessage: false,
        message: {
            user: '',
            message: '',
            emotes: [],
            badges: [],
            timestamp: 0
        }
    },
    getters: getters,
    actions: actions,
    mutations: mutations
}

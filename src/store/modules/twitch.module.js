import twitchService from '../../services/twitch.service';
import twitchPubSubService from '../../services/twitchPubSub.service';
import streamlabsService from '../../services/streamlabs.service';

export const TWITCH_CONNECT = 'Connect to twitch'
export const TWITCH_CONNECT_SUCCESS = '✅ Connected to twitch';
export const TWITCH_CONNECT_FAIL = '❌ Failed to connect to twitch';
export const TWITCH_EVENT = '👍 Received Event from Twitch';

export const GET_USER = 'Get User';
export const GET_USER_SUCCESS = '✅ Get User Success';
export const GET_USER_FAIL = '❌ Get User Fail';

export const GET_STREAM_DATA = 'Get Stream Data';
export const GET_STREAM_DATA_SUCCESS = '✅ Get Stream Data Success';
export const GET_STREAM_DATA_FAIL = '❌ Get Stream Data Fail';


const actions = {
    connect({ commit, rootState }) {
        commit(TWITCH_CONNECT);
        
        twitchPubSubService.connect().then(tps=>{
            twitchPubSubService.on('channel-points', e=>{
                commit(TWITCH_EVENT, {
                    type: 'channel-points',
                    name: e.name,
                    reward: e.reward,
                    message:e.message,
                    timestamp: +new Date()
                });
            })
        });

        streamlabsService.connect(rootState.config.config.streamlabs)
            .then(value => {
                streamlabsService.on('follow', (e) => {
                    commit(TWITCH_EVENT, {
                        type: e.type,
                        name: e.name
                    });
                });
                streamlabsService.on('raid', (e) => {
                    commit(TWITCH_EVENT, {
                        type: e.type,
                        name: e.name,
                        raiders: e.raiders
                    });
                });

                streamlabsService.addListener('subscription', (e) => {
                    console.log(e);
                    commit(TWITCH_EVENT, e);
                })

                commit(TWITCH_CONNECT_SUCCESS);
            },
                e => commit(TWITCH_CONNECT_FAIL, e));
    },
    getUser({ commit, state }, username) {
        commit(GET_USER);
        twitchService.getUser(username)
            .then(
                user => commit(GET_USER_SUCCESS, user.data[0]),
                error => commit(GET_USER_FAIL, error)
            );
    },

    getStreamData({commit}, username){
        commit(GET_STREAM_DATA);
        twitchService.getUser(username)
        .then(
            data => commit(GET_STREAM_DATA_SUCCESS, data),
            error => commit(GET_STREAM_DATA_FAIL, error)
        );
    }
    
}
const getters = {};

const mutations = {
    [TWITCH_CONNECT](state) {
        state.connecting = true;
        state.connected = false;
    },
    [TWITCH_CONNECT_SUCCESS](state) {
        state.connecting = false;
        state.connected = true;
    },
    [TWITCH_CONNECT_FAIL](state) {
        state.connecting = false;
        state.connected = false;
    },
    [TWITCH_EVENT](state, event) {
        state.event = event;
    },
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
    },
    [GET_STREAM_DATA](state){
        state.loading = true;
    },
    [GET_STREAM_DATA_SUCCESS](state, data){
        state.streamData = data;
        state.loading = false;
    },
    [GET_STREAM_DATA_FAIL](state,error){
        state.loading=false;
        state.error=error;
    }
}

export default {
    namespaced: true,
    state: {
        user: {},
        loading: false,
        connecting: false,
        connected: false,
        event: {},
        streamData:{}
    },
    getters: getters,
    actions: actions,
    mutations: mutations
}

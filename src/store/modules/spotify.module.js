import { SpotifyService } from '../../services/spotify.service';

const SPOTIFY_CONNECTING = 'Initializing Spotify';
const SPOTIFY_CONNECTED = 'Spotify Initialized';
const SPOTIFY_CONNECTION_FAILED = '❌ Spotify Connextion Failed';
const SPOTIFY_PLAYING = '▶ Spotify Playing';
const SPOTIFY_PAUSED = '⏸ Spotify Paused';

let spotifyService;

const actions = {
    initialize({ commit, rootState }) {
        if (!spotifyService) {
            spotifyService = new SpotifyService(rootState.config.config['spotify-oauth-token'], rootState.config.config['spotify']);
            commit(SPOTIFY_CONNECTING);
            spotifyService.connect().then(() => {
                commit(SPOTIFY_CONNECTED);
                spotifyService.enableRepeat();
            })
        }
    },    
    start({ commit, rootState  }) {
        spotifyService.start(rootState.config.config.spotify.playlist).then(() => {
            commit(SPOTIFY_PLAYING);
        })
    },
    play({ commit }) {
        spotifyService.play().then(() => {
            commit(SPOTIFY_PLAYING);
        })
    },
    pause({ commit }) {
        spotifyService.pause().then(() => {
            commit(SPOTIFY_PAUSED);
        })
    },
    enableRepeat({ commit }) {
        spotifyService.enableRepeat();
    }
}

const mutations = {
    [SPOTIFY_CONNECTING](state) {
        state.connected = false;
    },
    [SPOTIFY_CONNECTED](state) {
        state.connected = true;
    },
    [SPOTIFY_PLAYING](state) {
        state.playing = true;
    },
    [SPOTIFY_PAUSED](state) {
        state.playing = false;
    }
}

export default {
    namespaced: true,
    state: {
        connected: false,
        playing: false
    },
    actions: actions,
    mutations: mutations
}
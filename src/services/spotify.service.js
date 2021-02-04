// import SpotifyWebApi from 'spotify-web-api-js'
import EventEmitter from 'events';
import Store from 'electron-store';
import { contentTracing } from 'electron';

export class SpotifyService extends EventEmitter {

    constructor(token, options) {
        super();
        this.authToken = token;
        this.options = options;
        this.store = new Store();
    }

    connect() {
        return new Promise(async (res, rej) => {
            if (this.connected) res();
            try {
                let refreshToken = this.store.get('spotify-refresh-token');
                if (refreshToken) {
                    this.token = await this.getRefreshToken(refreshToken);
                }
                else {
                    this.token = await this.getToken();
                }
                res();
                //await this.start();
                // this.spotify = new SpotifyWebApi();
                // this.spotify.setAccessToken(this.options.code);
                // this.spotify.play();
            }
            catch (e) {                
                console.error(e);
                rej(e);
            }
            this.connected = true;
        })
    }

    getToken() {
        return fetch(
            "https://accounts.spotify.com/api/token?" +
            "grant_type=authorization_code&" +
            "code=" + this.authToken + "&" +
            "redirect_uri=http://localhost"
            , {
                "method": "POST",
                "headers": {
                    "Authorization": this.options.basic_token,
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            .then(async response => {
                let data = await response.json();
                if (data.error) {
                    console.error(data.errormessage);
                } else {
                    if (data.refresh_token) {
                        this.store.set('spotify-refresh-token', data.refresh_token);
                    }
                    return data.access_token;
                }
            })
            .catch(err => {
                console.error(err);
            });
    }

    getRefreshToken(refreshToken) {
        return fetch(
            "https://accounts.spotify.com/api/token?" +
            "grant_type=refresh_token&" +
            "refresh_token=" + refreshToken + "&" +
            "redirect_uri=http://localhost"
            , {
                "method": "POST",
                "headers": {
                    "Authorization": this.options.basic_token,
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            .then(async response => {
                let data = await response.json();
                if (data.error) {
                    console.error(data.errormessage);
                } else {
                    if (data.refresh_token) {
                        this.store.set('spotify-refresh-token', data.refresh_token);
                    }
                    return data.access_token;
                }
            })
            .catch(err => {
                console.error(err);
            });
    }

    async start(contextUri) {
        let body = {
            "context_uri": contextUri,
            "offset": {
                "position": 0
            },
            "position_ms": 0
        };

        fetch("https://api.spotify.com/v1/me/player/play", {
            "method": "PUT",
            "headers": {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.token
            },
            "body": JSON.stringify(body)
        })
            .then(async response => {
                let data = await response.text();
                if (data.error) {
                    console.error(data.errormessage);
                }
            })
            .catch(err => {
                console.error(err);
            });
    }

    async pause() {
        return fetch("https://api.spotify.com/v1/me/player/pause", {
            "method": "PUT",
            "headers": {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.token
            },
        })
            .then(async response => {
                let data = await response.text();
                if (data.error) {
                    console.error(data.errormessage);
                }
            })
            .catch(err => {
                console.error(err);
            });
    }
    async play() {
        return fetch("https://api.spotify.com/v1/me/player/play", {
            "method": "PUT",
            "headers": {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.token
            },
        })
            .then(async response => {   
                let data = await response.text();
                if (data.error) {
                    console.error(data.errormessage);
                }          
            })
            .catch(err => {
                console.error(err);
            });
    }

    async enableRepeat() {
        fetch("https://api.spotify.com/v1/me/player/repeat?state=context", {
            "method": "PUT",
            "headers": {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.token
            }
        })
            .then(async response => {
                let data = await response.text();
                if (data.error) {
                    console.error(data.errormessage);
                }
            })
            .catch(err => {
                console.error(err);
            });
    }
}

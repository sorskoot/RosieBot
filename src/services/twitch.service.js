import Store from 'electron-store';
import moment from 'moment';

class TwitchClass {

    constructor() {
        let store = new Store();
        this._token = store.get('oauth-token');
    }

    getUser(user) {
        if (!user) return;
        var querystring = `login=${user}`;
        //GET https://api.twitch.tv/helix/users?id=<user ID>&id=<user ID>
        return this.get(`https://api.twitch.tv/helix/users?${querystring}`)
        //new Promise((res, rej) => {

        //    fetch(`https://api.twitch.tv/helix/users?${querystring}`, {
        //         headers: { 
        //             'client-id': process.dotenv.TWITCH_CLIENTID
        //         }
        //     }, function (error, response, body) {
        //         if (!!error) {
        //             rej(error);
        //         }
        //         if (response.statusCode != 200) {
        //             rej(`statuscode: ${response.statusCode}`);
        //         }
        //         res(JSON.parse(body).data);
        //     });
        //});
    }

    async get(url) {
        const response = await fetch(url, {
            headers: {
                'client-id': process.dotenv.TWITCH_CLIENTID
            }
        });
        return response.json();
    }

    async getStreamData(username) {
        let streamData = await fetch(`https://api.twitch.tv/helix/streams?user_login=${username}`, {
            headers: {
                'client-id': process.env.TWITCH_CLIENTID,
                'Authorization': `Bearer ${this._token}`
            }
        }).then(body => body.json());

        console.log(streamData);
        if (!streamData.data.length) {
            return {
                username:username,
                isLive: false
            }
        } else {
            const uptime =moment.utc(moment.utc() - moment.utc(streamData.data[0].started_at)); 
            return {
                username:username,
                thumbnailUrl:streamData.data[0].thumbnail_url,
                title:streamData.data[0].title,
                startedAt:streamData.data[0].started_at,
                uptime: `${("0" + uptime.hour()).slice (-2)}:${("0" + uptime.minute()).slice (-2)}:${("0" + uptime.second()).slice (-2)}`,
                isLive: true
            }
        }
    }
}

export default new TwitchClass();

import Store from 'electron-store';
import moment from 'moment';

export class TwitchClass {

    constructor() {
        let store = new Store();
        this._token = store.get('oauth-token');
        this._clientid = store.get('client-id');
    }

    getUser(user) {
        if (!user) return;
        var querystring = `login=${user}`;
        return this.get(`https://api.twitch.tv/helix/users?${querystring}`)       
    }

    async get(url) {
        const response = await fetch(url, {
            headers: {
                'client-id': this._clientid
            }
        });
        return response.json();
    }

    async getStreamData(username) {
        let streamData = await fetch(`https://api.twitch.tv/helix/streams?user_login=${username}`, {
            headers: {
                'client-id': this._clientid,
                'Authorization': `Bearer ${this._token}`
            }
        }).then(body => body.json());

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

    /**
     * Adds a stream marker
     * @param {string} text the text to add to the marker
     * @param {string} userId the user_id of the stream to add the marker
     */
    async addMarker(text, userId){
        let result = await fetch(`https://api.twitch.tv/helix/streams/markers`, {
            body:JSON.stringify({
                "user_id":userId,
                "description":text
            }),            
            method:"POST",
            headers: {
                'content-type':'application/json',
                'client-id': this._clientid,
                'Authorization': `Bearer ${this._token}`
            }
        }).then(body => body.json());
        console.log(result);
        return result;
    }
}



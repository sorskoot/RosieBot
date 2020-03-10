import Store from 'electron-store';

class TwitchClass {
    
    constructor(){
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

    getStreamData(username){
        return fetch(`https://api.twitch.tv/helix/streams?user_login=${username}`, {
            headers: {
                'client-id': process.env.TWITCH_CLIENTID,
                'Authorization':`Bearer ${this._token}`
            }
        }, function (error, response, body) {
            if (!!error) {
                rej(error);
                return;
            }
            if (response.statusCode != 200) {
                rej(`statuscode: ${response.statusCode}`);
                return;
            }
            res(JSON.parse(body));
        });

    }
}

export default new TwitchClass();

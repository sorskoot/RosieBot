async function getUser(user) {
    if (!user) return;
    var querystring = `login=${user}`;
    //GET https://api.twitch.tv/helix/users?id=<user ID>&id=<user ID>
    return get(`https://api.twitch.tv/helix/users?${querystring}`)
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

async function get(url) {
    const response = await fetch(url, {
        headers: {
            'client-id': process.dotenv.TWITCH_CLIENTID
        }
    });
    return response.json();
}

export const twitchService = {
    getUser
}
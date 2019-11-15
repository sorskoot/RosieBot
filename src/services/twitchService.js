function getUser(user) {
    if (!user) return;
    var querystring = `login=${user}`;
    //GET https://api.twitch.tv/helix/users?id=<user ID>&id=<user ID>
   return new Promise((res, rej) => {
        request.get(`https://api.twitch.tv/helix/users?${querystring}`, {
            headers: { 
                'client-id': process.doenv.TWITCH_CLIENTID
            }
        }, function (error, response, body) {
            if (!!error) {
                rej(error);
            }
            if (response.statusCode != 200) {
                rej(`statuscode: ${response.statusCode}`);
            }
            res(JSON.parse(body).data);
        });
    });
}


export const twitchService = {
    getUser
}